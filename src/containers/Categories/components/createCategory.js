import CategoryBase from "./categoryBase"
import { postCategory } from "../../../core/services/categoriesServices";
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"


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
    admins: []
  };

  handleSave = async () => {
    this.setState({
      checkErrors: true,
    });
    if (this.checkErrors()) {
      let target = document.querySelector('#account');
      target.scrollIntoView &&
          target.scrollIntoView({
              behavior: "smooth"
          });
      return;
    }
    let cover ={
        original: this.state.coverURL,
        sizes: {
            "720x360": this.state.coverURL,
        }
    }
    let icon ={
        original: this.state.iconURL,
        sizes: {
            "240x240": this.state.iconURL,
        }
    }
    let data = {
        account: this.state.account,
        name: this.state.name,
        description: this.state.description,
        cover: cover,
        icon: icon,
        admins: this.state.admins,
    };
    ;
    try {
      await postCategory(data);
      ;
      renderSuccessNotification("Category post success");
      setTimeout(()=>{
        this.props.history.goBack()
      },1000)

    } catch (e) {
      console.error(e);
      renderFailureNotification("Category post error");
    }
  };


  render(){
    return this.renderMainContent()
  }
}