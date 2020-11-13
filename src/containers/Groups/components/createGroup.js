import GroupBase from "./groupBase"
import { postGroups } from "../../../core/services/groupsServices";


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
      users: [this.state.user],
    };
    ;
    try {
      await postGroups(data);
      ;
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