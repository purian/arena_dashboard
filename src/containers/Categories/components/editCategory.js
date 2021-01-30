import CategoryBase from "./categoryBase"
import { fetchCategoryById, editCategory } from "../../../core/services/categoriesServices";
import Spinner from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"

export default class EditCategory extends CategoryBase{
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
        categoryId: null,
        categoryData: null,
        loading: true
      };

    componentDidMount(){
        const categoryId = this.props.match.params.id
        
        this.fetchCategoryData(categoryId)
      }

    fetchCategoryData =async(id) =>{
        if(!id){
          renderFailureNotification("id not present")
        }
        try{
            let response = await fetchCategoryById(id)
            
            this.setState({
                account: response.data.account,
                name: response.data.name,
                description: response.data.description,
                admins: response.data.admins,
                loading: false,
                categoryData: response.data,
                categoryId: id,
                coverURL: response.data?.cover?.original,
                iconURL: response.data?.icon?.original,
                editCategory: true,

            })

        }catch(e){
            console.error(e)
            renderFailureNotification("Category data not fetched")
            this.setState({
                loading: false
            })
        }
    }
    
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
        ;
        try {
          await editCategory(data, this.state.categoryId);
          ;
          renderSuccessNotification("Category edit success");
          setTimeout(()=>{
            this.props.history.goBack()
          },1000)
        } catch (e) {
          console.error(e);
          if(e?.response?.data?.details?.name?.message){
            renderFailureNotification(e?.response?.data?.details?.name?.message);
          }else{
            renderFailureNotification("Category edit error");
          }
        }
      };
    
    
      render(){
          if(this.state.loading){
              return <Spinner size="24px" style={{ color: "#65D2FC" }} />
          }
          if(!this.state.categoryData){
              return(
                  <Typography variant="h6" >
                    No data found
                  </Typography>
              )
          }
        return this.renderMainContent()
      }
}