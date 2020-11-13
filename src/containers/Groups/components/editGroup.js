import GroupBase from "./groupBase"
import { postGroups, fetchGroupData, editGroup } from "../../../core/services/groupsServices";
import Spinner from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

const DATA ={
    "id": "",
    "name": "Mogla Group",
    "account": {
      "name": "save on foods test abc",
      "cover": {
        "sizes": {
          "720x360": "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg"
        },
        "original": "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg"
      },
      "icon": {
        "sizes": {
          "240x240": "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg"
        },
        "original": "https://s3.arena.shabloool.co.il/uploads/5f68f9aaf778e2149dc5feb1/QPOqKNTA39rXxrBsCYLnyTFn/S5iJwHwLqEHTDRm5v_ALfKea/Ab-0tZh1SWyvFhmI.jpg"
      },
      "admins": [
        "5f7db65e2c50706f4b7dbbe2"
      ],
      "active": false,
      "slug": "save-on-foods-abc-d",
      "owner": "5f68f980f778e2f32ac5fead",
      "id": "5faa88ab54d29e75a266e7b2",
      "canAdminister": true
    },
    "users": [
      {
        "name": "Paras Mogla",
        "email": "parasmogla@yahoo.in",
        "id": "5f7ea5e22c507048d57dbc0c"
      },
      {
        "name": "Paras",
        "email": "paras@techalpha.studio",
        "id": "5f34daf9a1027da84a2cac5a"
      }
    ]
  }
export default class EditGroup extends GroupBase{
    state = {
        account: null,
        name: null,
        users: null,
        currentPage: 0,
        accountsData: [],
        usersData: [],
        loading: true,
        groupData: null,
        groupId: null
      };

    async componentDidMount(){
        const groupId = this.props.match.params.id
        
        this.fetchGroupData(groupId)
      }

    fetchGroupData =async(id) =>{
        if(!id){
            alert("id not present")
        }
        try{
            let response = await fetchGroupData(id)
            this.setState({
                account: response.data.account,
                name: response.data.name,
                users: response.data.users,
                loading: false,
                groupData: response.data,
                groupId: id
            })

        }catch(e){
            console.error(e)
            alert("Group data not fetched")
            this.setState({
                loading: false,
                //Delete this once api works 
                account: DATA.account,
                name: DATA.name,
                users: DATA.users,
                groupData: DATA,
                groupId: id

            })
        }
    }
    
      handleSave = async () => {
        let data = {
          account: this.state.account,
          name: this.state.name,
          users: this.state.users,
        };
        ;
        try {
          await editGroup(data, this.state.groupId);
          ;
          alert("Group edit success");
        } catch (e) {
          console.error(e);
          alert("Group edit error");
        }
      };
    
    
      render(){
          if(this.state.loading){
              return <Spinner size="24px" style={{ color: "#65D2FC" }} />
          }
          if(!this.state.groupData){
              return(
                  <Typography variant="h6" >
                    No data found
                  </Typography>
              )
          }
        return this.renderMainContent()
      }
}