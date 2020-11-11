import GroupBase from "./groupBase"
import { postGroups } from "../../../core/services/groupsServices";


export default class CreateGroup extends GroupBase {
  state = {
    account: null,
    name: null,
    users: null,
    currentPage: 0,
    accountsData: [],
    usersData: [],
  };

  handleSave = async () => {
    let data = {
      account: this.state.account,
      name: this.state.name,
      users: [this.state.user],
    };
    debugger;
    try {
      await postGroups(data);
      debugger;
      alert("Group post success");
    } catch (e) {
      console.error(e);
      alert("Group post error");
    }
  };


  render(){
    return this.renderMainContent()
  }
}