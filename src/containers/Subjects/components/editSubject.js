import SubjectBase from "./subjectBase"

import { fetchSubjectById, editSubject} from "../../../core/services/subjectsServices";
import Spinner from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import {SUBJECT_STATUS, FORM_TYPE_MAP} from "../../../core/constants/constant"
import {renderSuccessNotification, renderFailureNotification} from "../../../common/Notifications/showNotifications"


export default class EditSubject extends SubjectBase{
  state = {
    account: null,
    name: null,
    currentPage: 0,
    accountsData: [],
    adminsData: [],
    description: null,
    admins: [],

    status: this.getStatusType(SUBJECT_STATUS.DRAFT),
    startDate: new Date(),
    endDate: new Date(),
    conclusion: [{
      title: "",
      icon: null,
      text1: "",
      text2: "",
    }],
    private: false,
    showReport: false,
    categoryData: [],
    category: null,
    question: null,
    type: this.getFormType(FORM_TYPE_MAP.discussion),
    cover: null,
    showConclusion: false,
    choice: null,
    allocation: null,
    loading: true,
    subjectData: null,
    subjectId: null,
    openCommentModal: false
  };

    componentDidMount(){
        const subjectId = this.props.match.params.id
        
        this.fetchSubjectData(subjectId)
      }

    fetchSubjectData =async(id) =>{
        if(!id){
          renderFailureNotification("id not present")
        }
        try{
            let response = await fetchSubjectById(id)
            
            if(response.data.choice){
              this.setState({
                choice :response.data.choice

              })
            }
            if(response.data.allocation){
              this.setState({
                allocation : response.data.allocation
              })
            }
            this.setState({
              account: response.data.account,
              category: response.data.category,
              startDate: response.data.startDate,
              endDate: response.data.endDate,
              type: this.getFormType(response.data.type),
              status: this.getStatusType(response.data.status),
              name: response.data.name,
              description: response.data.description,
              conclusion: response.data.conclusion,
              showReport: response.data.intermediateReport,
              private: response.data.private,
              files: response.data.files,
              experts: response.data.admins,
              groups: response.data.groups,
              loading: false,
              subjectData: response.data,
              subjectId: id,
              question: response.data.question,
              cover: response.data?.cover?.original,
              conclusionFiles: response.data.conclusionFiles

            })
            renderSuccessNotification("Subject data fetched")

        }catch(e){
            console.error(e)
            renderFailureNotification("Subject data not fetched")
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
      let data = {
          account: this.state.account,
          category: this.state.category,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          type: this.state.type.value,
          status: this.state.status.value,
          name: this.state.name,
          description: this.state.description,
          conclusion: this.state.conclusion,
          intermediateReport: this.state.showReport,
          private: this.state.private,
          files: [],
          experts: this.state.admins,
          groups: this.state.groups
      };
      if(this.state.choice){
        data.choice = this.state.choice
      }
      if(this.state.allocation){
        data.allocation = this.state.allocation
      }
      ;
      try {
        await editSubject(data, this.state.subjectId);
        ;
        renderSuccessNotification("Subject edit success");
        this.props.history.goBack()
      } catch (e) {
        console.error(e);
        renderFailureNotification("Subject edit error");
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