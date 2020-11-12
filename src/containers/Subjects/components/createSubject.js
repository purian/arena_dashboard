import React, { Component, Fragment } from "react";
import SubjectBase from "./subjectBase"

const SUBJECT_STATUS = [
    "FINISHED",
    "PUBLISHED",
    "DRAFT"
];

export default class CreateSubject extends SubjectBase {
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

        status: SUBJECT_STATUS[2],
        startDate: new Date(),
        endDate: new Date(),
        conclusion: null,
        private: false,
        showReport: false,
        categoryData: [],
        category: null
      };



    render(){
        return this.renderMainContent()
    }
}
