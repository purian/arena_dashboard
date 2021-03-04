import CategoryBase from "./categoryBase";
import { postCategory } from "../../../core/services/categoriesServices";
import {
  renderSuccessNotification,
  renderFailureNotification,
} from "../../../common/Notifications/showNotifications";
import { getAccounts } from "../../../core/services/accountsServices";

export default class CreateCategory extends CategoryBase {
  state = {
    account: null,
    name: null,
    currentPage: 0,
    accountsData: [],
    adminsData: [],
    description: null,
    iconURL: null,
    coverURL: null,
    admins: [],
  };

  componentDidMount=async()=>{
    try {
      let response = await getAccounts(
        100,
        this.state.currentPage,
        ""
      );
      this.setState({
        accountsData: response.data.items
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleSave = async () => {
    this.setState({
      checkErrors: true,
    });
    if (this.checkErrors()) {
      let target = document.querySelector("#account");
      target.scrollIntoView &&
        target.scrollIntoView({
          behavior: "smooth",
        });
      return;
    }
    let cover = {
      original: this.state.coverURL,
      sizes: {
        "720x360": this.state.coverURL,
      },
    };
    let icon = {
      original: this.state.iconURL,
      sizes: {
        "240x240": this.state.iconURL,
      },
    };
    let data = {
      account: this.state.account,
      name: this.state.name,
      description: this.state.description,
      cover: cover,
      icon: icon,
      admins: this.state.admins,
    };
    try {
      let response = await postCategory(data);

      renderSuccessNotification("Category post success");
      setTimeout(() => {
        this.props.history.replace(`/admin/categories/${response.data.id}`);
      }, 1000);
    } catch (e) {
      console.error(e);
      if (e?.response?.data?.details?.name?.message) {
        renderFailureNotification(e?.response?.data?.details?.name?.message);
      } else {
        renderFailureNotification("Category post error");
      }
    }
  };

  render() {
    return this.renderMainContent();
  }
}
