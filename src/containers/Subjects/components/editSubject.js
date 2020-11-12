import SubjectBase from "./subjectBase"

import { fetchSubjectById} from "../../../core/services/subjectsServices";
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

  const SUBJECT_STATUS = [
    "FINISHED",
    "PUBLISHED",
    "DRAFT"
];
export default class EditSubject extends SubjectBase{
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
        subjectId: null,
        categoryData: null,
        loading: true,

        status: SUBJECT_STATUS[2],
        startDate: new Date(),
        endDate: new Date(),
        conclusion: null,
        private: false,
        showReport: false,
        categoryData: [],
        category: null
      };

    componentDidMount(){
        const subjectId = this.props.match.params.id
        debugger
        this.fetchSubjectData(subjectId)
      }

    fetchSubjectData =async(id) =>{
        if(!id){
            alert("id not present")
        }
        try{
            let response = await fetchSubjectById(id)
            debugger
            this.setState({
                account: response.data.account,
                name: response.data.name,
                description: response.data.description,
                admins: response.data.admins,
                loading: false,
                categoryData: response.data,
                subjectId: id
            })

        }catch(e){
            console.error(e)
            alert("Category data not fetched")
            this.setState({
                loading: false
            })
        }
    }
    
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
        //   await editCategory(data, this.state.subjectId);
          debugger;
          alert("Category edit success");
        } catch (e) {
          console.error(e);
          alert("Category edit error");
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