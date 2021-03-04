import GroupBase from "./groupBase"
import { postGroups } from "../../../core/services/groupsServices";
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"
import { getAccounts } from "../../../core/services/accountsServices";


export default class CreateGroup extends GroupBase {
  state = {
    account: null,
    name: null,
    users: [],
    currentPage: 0,
    accountsData: [],
    usersData: [],
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
    let data = {
      account: this.state.account,
      name: this.state.name,
      users: this.state.users,
    };
    if(this.checkErrors(data)){
      return
    }
    try {
      
      let resp = await postGroups(data);
      
      renderSuccessNotification("Group post success");
      setTimeout(()=>{
        this.props.history.replace(`/admin/groups/${resp.data.id}`)
      },1000)
    } catch (e) {
      console.error(e);
      if(e?.response?.data?.details?.name?.message){
        renderFailureNotification(e?.response?.data?.details?.name?.message);
      }else{
        renderFailureNotification("Group post error");
      }
    }
  };


  render(){
    return this.renderMainContent()
  }
}