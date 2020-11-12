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
        showConclusion: false
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
            category: this.state.category,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            type: FORM_TYPE_MAP.discussion,
            status: this.state.status,
            name: this.state.name,
            description: this.state.description,
            conclusion: this.state.conclusion,
            intermediateReport: this.state.showReport,
            private: this.state.private,
            files: [],
            experts: this.state.admins,
            groups: this.state.groups
        };
        debugger;
        try {
          await postSubject(data);
          debugger;
          alert("Subject post success");
        } catch (e) {
          console.error(e);
          alert("Subject post error");
        }
      };


    render(){
        return this.renderMainContent()
    }
}
