import React, { Component, Fragment } from "react";
import SubjectBase from "./subjectBase"
import {postSubject} from "../../../core/services/subjectsServices"
import {SUBJECT_STATUS, FORM_TYPE_MAP} from "../../../core/constants/constant"


export default class CreateSubject extends SubjectBase {
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
        allocation: null
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
            groups: this.state.groups,
            question: this.state.question
        };
        if(this.state.choice){
          data.choice = this.state.choice
        }
        if(this.state.allocation){
          data.allocation = this.state.allocation
        }
        debugger;
        try {
          await postSubject(data);
          debugger;
          alert("Subject post success");
          this.props.history.push("/admin/subjects")
        } catch (e) {
          console.error(e);
          alert("Subject post error");
        }
      };


    render(){
        return this.renderMainContent()
    }
}
