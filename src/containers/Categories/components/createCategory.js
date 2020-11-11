import CategoryBase from "./categoryBase"
import { postCategory } from "../../../core/services/categoriesServices";


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
    let cover ={
        original: this.state.coverURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
        sizes: {
            "720x360": this.state.coverURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
        }
    }
    let icon ={
        original: this.state.iconURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
        sizes: {
            "240x240": this.state.iconURL || "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg",
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
    debugger;
    try {
      await postCategory(data);
      debugger;
      alert("Category post success");
    } catch (e) {
      console.error(e);
      alert("Category post error");
    }
  };


  render(){
    return this.renderMainContent()
  }
}