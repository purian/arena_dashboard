import GroupBase from "./groupBase"
import { postGroups } from "../../../core/services/groupsServices";
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"


export default class CreateGroup extends GroupBase {
  state = {
    account: null,
    name: null,
    users: [],
    currentPage: 0,
    accountsData: [],
    usersData: [],
  };

  handleSave = async () => {
    let data = {
      account: this.state.account,
      name: this.state.name,
      users: this.state.users,
    };
    ;
    try {
      
      let resp = await postGroups(data);
      
      renderSuccessNotification("Group post success");
      setTimeout(()=>{
        this.props.history.replace(`/admin/groups/${resp.data.id}`)
      },1000)
    } catch (e) {
      console.error(e);
      renderFailureNotification("Group post error");
    }
  };


  render(){
    return this.renderMainContent()
  }
}