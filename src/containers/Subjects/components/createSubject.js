import React, { Component, Fragment } from "react";
import SubjectBase from "./subjectBase";
import { postSubject } from "../../../core/services/subjectsServices";
import {
  SUBJECT_STATUS,
  FORM_TYPE_MAP,
} from "../../../core/constants/constant";
import {
  renderSuccessNotification,
  renderFailureNotification,
} from "../../../common/Notifications/showNotifications";

export default class CreateSubject extends SubjectBase {
  state = {
    account: null,
    name: null,
    currentPage: 0,
    accountsData: [],
    adminsData: [],
    description: null,
    admins: [],
    groups: [],
    status: this.getStatusType(SUBJECT_STATUS.DRAFT),
    startDate: new Date(),
    endDate: new Date(),
    conclusion: [
      {
        title: "",
        icon: null,
        text1: "",
        text2: "",
      },
    ],
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
    files: [],
    openCommentModal: false,
    groupsData: [],
    tags: [],
  };

  handleSave = async () => {
    this.setState({
      checkErrors: true,
    });
    if (this.checkErrors()) {
      let target = document.querySelector("#account");
      target.scrollIntoView &&
        target.scrollIntoView({
          behavior: "smooth",
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
      files: this.state.files,
      experts: this.state.experts,
      groups: this.state.groups,
      question: this.state.question,
      cover: this.state.cover,
      conclusionFiles: this.state.conclusionFiles,
      admins: this.state.subjectAdmins,
      tags: this.state.tags,
    };
    if (this.state.type.value === FORM_TYPE_MAP.choice) {
      data.choice = this.state.choice;
    }
    if (this.state.type.value === FORM_TYPE_MAP.allocation) {
      data.allocation = this.state.allocation;
    }
    try {
      let resp = await postSubject(data);
      renderSuccessNotification("Subject post success");
      setTimeout(() => {
        this.props.history.replace(`/admin/subjects/${resp.data.id}`);
      }, 1000);
    } catch (e) {
      console.error(e);
      if (e?.response?.data?.details?.name?.message) {
        renderFailureNotification(e?.response?.data?.details?.name?.message);
      } else {
        renderFailureNotification("Subject post error");
      }
    }
  };

  render() {
    return this.renderMainContent();
  }
}
