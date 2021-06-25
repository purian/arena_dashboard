import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArenaDatePicker from "../../../common/arenaDatePicker/arenaDatePicker";
import ArenaUploader from "../../../common/arenaUploader/arenaUploader";
import {
  FORM_TYPE_MAP,
  SUBJECT_STATUS,
} from "../../../core/constants/constant";
import {
  getAccounts,
  getUsersByAccountId,
} from "../../../core/services/accountsServices";
import { fetchCategoryByAccountId } from "../../../core/services/categoriesServices";
import { getUsers } from "../../../core/services/usersServices";
import Icon from "@material-ui/core/Icon";
import ArenaDropdown from "../../../common/arenaDropdown/arenaDropdown";
import ConclusionComponent from "../../../common/conclusionComponent/conclusionComponent";
import CommentsModal from "./commentsModal";
import Dialog from "@material-ui/core/Dialog";
import {
  renderSuccessNotification,
  renderFailureNotification,
} from "../../../common/Notifications/showNotifications";
import { searchGroupByAccountId } from "../../../core/services/groupsServices";
import ChipInput from "material-ui-chip-input";
const PAGE_LIMIT = 20;

const STATUS_DATA = [
  { name: SUBJECT_STATUS.DRAFT, value: SUBJECT_STATUS.DRAFT },
  { name: SUBJECT_STATUS.PUBLISHED, value: SUBJECT_STATUS.PUBLISHED },
  { name: SUBJECT_STATUS.FINISHED, value: SUBJECT_STATUS.FINISHED },
];

const FORM_TYPE_DATA = [
  { name: FORM_TYPE_MAP.discussion, value: FORM_TYPE_MAP.discussion },
  { name: FORM_TYPE_MAP.allocation, value: FORM_TYPE_MAP.allocation },
  { name: FORM_TYPE_MAP.choice, value: FORM_TYPE_MAP.choice },
];

export const IMAGE_DROPDOWN = [
  
    {
        "value": "fab fa-500px",
        "label": "fab fa-500px"
    },
    {
        "value": "fab fa-accessible-icon",
        "label": "fab fa-accessible-icon"
    },
    {
        "value": "fab fa-accusoft",
        "label": "fab fa-accusoft"
    },
    {
        "value": "fas fa-address-book",
        "label": "fas fa-address-book"
    },
    {
        "value": "far fa-address-book",
        "label": "far fa-address-book"
    },
    {
        "value": "fas fa-address-card",
        "label": "fas fa-address-card"
    },
    {
        "value": "far fa-address-card",
        "label": "far fa-address-card"
    },
    {
        "value": "fas fa-adjust",
        "label": "fas fa-adjust"
    },
    {
        "value": "fab fa-adn",
        "label": "fab fa-adn"
    },
    {
        "value": "fab fa-adversal",
        "label": "fab fa-adversal"
    },
    {
        "value": "fab fa-affiliatetheme",
        "label": "fab fa-affiliatetheme"
    },
    {
        "value": "fab fa-algolia",
        "label": "fab fa-algolia"
    },
    {
        "value": "fas fa-align-center",
        "label": "fas fa-align-center"
    },
    {
        "value": "fas fa-align-justify",
        "label": "fas fa-align-justify"
    },
    {
        "value": "fas fa-align-left",
        "label": "fas fa-align-left"
    },
    {
        "value": "fas fa-align-right",
        "label": "fas fa-align-right"
    },
    {
        "value": "fab fa-amazon",
        "label": "fab fa-amazon"
    },
    {
        "value": "fas fa-ambulance",
        "label": "fas fa-ambulance"
    },
    {
        "value": "fas fa-american-sign-language-interpreting",
        "label": "fas fa-american-sign-language-interpreting"
    },
    {
        "value": "fab fa-amilia",
        "label": "fab fa-amilia"
    },
    {
        "value": "fas fa-anchor",
        "label": "fas fa-anchor"
    },
    {
        "value": "fab fa-android",
        "label": "fab fa-android"
    },
    {
        "value": "fab fa-angellist",
        "label": "fab fa-angellist"
    },
    {
        "value": "fas fa-angle-double-down",
        "label": "fas fa-angle-double-down"
    },
    {
        "value": "fas fa-angle-double-left",
        "label": "fas fa-angle-double-left"
    },
    {
        "value": "fas fa-angle-double-right",
        "label": "fas fa-angle-double-right"
    },
    {
        "value": "fas fa-angle-double-up",
        "label": "fas fa-angle-double-up"
    },
    {
        "value": "fas fa-angle-down",
        "label": "fas fa-angle-down"
    },
    {
        "value": "fas fa-angle-left",
        "label": "fas fa-angle-left"
    },
    {
        "value": "fas fa-angle-right",
        "label": "fas fa-angle-right"
    },
    {
        "value": "fas fa-angle-up",
        "label": "fas fa-angle-up"
    },
    {
        "value": "fab fa-angrycreative",
        "label": "fab fa-angrycreative"
    },
    {
        "value": "fab fa-angular",
        "label": "fab fa-angular"
    },
    {
        "value": "fab fa-app-store",
        "label": "fab fa-app-store"
    },
    {
        "value": "fab fa-app-store-ios",
        "label": "fab fa-app-store-ios"
    },
    {
        "value": "fab fa-apper",
        "label": "fab fa-apper"
    },
    {
        "value": "fab fa-apple",
        "label": "fab fa-apple"
    },
    {
        "value": "fab fa-apple-pay",
        "label": "fab fa-apple-pay"
    },
    {
        "value": "fas fa-archive",
        "label": "fas fa-archive"
    },
    {
        "value": "fas fa-arrow-alt-circle-down",
        "label": "fas fa-arrow-alt-circle-down"
    },
    {
        "value": "far fa-arrow-alt-circle-down",
        "label": "far fa-arrow-alt-circle-down"
    },
    {
        "value": "fas fa-arrow-alt-circle-left",
        "label": "fas fa-arrow-alt-circle-left"
    },
    {
        "value": "far fa-arrow-alt-circle-left",
        "label": "far fa-arrow-alt-circle-left"
    },
    {
        "value": "fas fa-arrow-alt-circle-right",
        "label": "fas fa-arrow-alt-circle-right"
    },
    {
        "value": "far fa-arrow-alt-circle-right",
        "label": "far fa-arrow-alt-circle-right"
    },
    {
        "value": "fas fa-arrow-alt-circle-up",
        "label": "fas fa-arrow-alt-circle-up"
    },
    {
        "value": "far fa-arrow-alt-circle-up",
        "label": "far fa-arrow-alt-circle-up"
    },
    {
        "value": "fas fa-arrow-circle-down",
        "label": "fas fa-arrow-circle-down"
    },
    {
        "value": "fas fa-arrow-circle-left",
        "label": "fas fa-arrow-circle-left"
    },
    {
        "value": "fas fa-arrow-circle-right",
        "label": "fas fa-arrow-circle-right"
    },
    {
        "value": "fas fa-arrow-circle-up",
        "label": "fas fa-arrow-circle-up"
    },
    {
        "value": "fas fa-arrow-down",
        "label": "fas fa-arrow-down"
    },
    {
        "value": "fas fa-arrow-left",
        "label": "fas fa-arrow-left"
    },
    {
        "value": "fas fa-arrow-right",
        "label": "fas fa-arrow-right"
    },
    {
        "value": "fas fa-arrow-up",
        "label": "fas fa-arrow-up"
    },
    {
        "value": "fas fa-arrows-alt",
        "label": "fas fa-arrows-alt"
    },
    {
        "value": "fas fa-arrows-alt-h",
        "label": "fas fa-arrows-alt-h"
    },
    {
        "value": "fas fa-arrows-alt-v",
        "label": "fas fa-arrows-alt-v"
    },
    {
        "value": "fas fa-assistive-listening-systems",
        "label": "fas fa-assistive-listening-systems"
    },
    {
        "value": "fas fa-asterisk",
        "label": "fas fa-asterisk"
    },
    {
        "value": "fab fa-asymmetrik",
        "label": "fab fa-asymmetrik"
    },
    {
        "value": "fas fa-at",
        "label": "fas fa-at"
    },
    {
        "value": "fab fa-audible",
        "label": "fab fa-audible"
    },
    {
        "value": "fas fa-audio-description",
        "label": "fas fa-audio-description"
    },
    {
        "value": "fab fa-autoprefixer",
        "label": "fab fa-autoprefixer"
    },
    {
        "value": "fab fa-avianex",
        "label": "fab fa-avianex"
    },
    {
        "value": "fab fa-aviato",
        "label": "fab fa-aviato"
    },
    {
        "value": "fab fa-aws",
        "label": "fab fa-aws"
    },
    {
        "value": "fas fa-backward",
        "label": "fas fa-backward"
    },
    {
        "value": "fas fa-balance-scale",
        "label": "fas fa-balance-scale"
    },
    {
        "value": "fas fa-ban",
        "label": "fas fa-ban"
    },
    {
        "value": "fab fa-bandcamp",
        "label": "fab fa-bandcamp"
    },
    {
        "value": "fas fa-barcode",
        "label": "fas fa-barcode"
    },
    {
        "value": "fas fa-bars",
        "label": "fas fa-bars"
    },
    {
        "value": "fas fa-bath",
        "label": "fas fa-bath"
    },
    {
        "value": "fas fa-battery-empty",
        "label": "fas fa-battery-empty"
    },
    {
        "value": "fas fa-battery-full",
        "label": "fas fa-battery-full"
    },
    {
        "value": "fas fa-battery-half",
        "label": "fas fa-battery-half"
    },
    {
        "value": "fas fa-battery-quarter",
        "label": "fas fa-battery-quarter"
    },
    {
        "value": "fas fa-battery-three-quarters",
        "label": "fas fa-battery-three-quarters"
    },
    {
        "value": "fas fa-bed",
        "label": "fas fa-bed"
    },
    {
        "value": "fas fa-beer",
        "label": "fas fa-beer"
    },
    {
        "value": "fab fa-behance",
        "label": "fab fa-behance"
    },
    {
        "value": "fab fa-behance-square",
        "label": "fab fa-behance-square"
    },
    {
        "value": "fas fa-bell",
        "label": "fas fa-bell"
    },
    {
        "value": "far fa-bell",
        "label": "far fa-bell"
    },
    {
        "value": "fas fa-bell-slash",
        "label": "fas fa-bell-slash"
    },
    {
        "value": "far fa-bell-slash",
        "label": "far fa-bell-slash"
    },
    {
        "value": "fas fa-bicycle",
        "label": "fas fa-bicycle"
    },
    {
        "value": "fab fa-bimobject",
        "label": "fab fa-bimobject"
    },
    {
        "value": "fas fa-binoculars",
        "label": "fas fa-binoculars"
    },
    {
        "value": "fas fa-birthday-cake",
        "label": "fas fa-birthday-cake"
    },
    {
        "value": "fab fa-bitbucket",
        "label": "fab fa-bitbucket"
    },
    {
        "value": "fab fa-bitcoin",
        "label": "fab fa-bitcoin"
    },
    {
        "value": "fab fa-bity",
        "label": "fab fa-bity"
    },
    {
        "value": "fab fa-black-tie",
        "label": "fab fa-black-tie"
    },
    {
        "value": "fab fa-blackberry",
        "label": "fab fa-blackberry"
    },
    {
        "value": "fas fa-blind",
        "label": "fas fa-blind"
    },
    {
        "value": "fab fa-blogger",
        "label": "fab fa-blogger"
    },
    {
        "value": "fab fa-blogger-b",
        "label": "fab fa-blogger-b"
    },
    {
        "value": "fab fa-bluetooth",
        "label": "fab fa-bluetooth"
    },
    {
        "value": "fab fa-bluetooth-b",
        "label": "fab fa-bluetooth-b"
    },
    {
        "value": "fas fa-bold",
        "label": "fas fa-bold"
    },
    {
        "value": "fas fa-bolt",
        "label": "fas fa-bolt"
    },
    {
        "value": "fas fa-bomb",
        "label": "fas fa-bomb"
    },
    {
        "value": "fas fa-book",
        "label": "fas fa-book"
    },
    {
        "value": "fas fa-bookmark",
        "label": "fas fa-bookmark"
    },
    {
        "value": "far fa-bookmark",
        "label": "far fa-bookmark"
    },
    {
        "value": "fas fa-braille",
        "label": "fas fa-braille"
    },
    {
        "value": "fas fa-briefcase",
        "label": "fas fa-briefcase"
    },
    {
        "value": "fab fa-btc",
        "label": "fab fa-btc"
    },
    {
        "value": "fas fa-bug",
        "label": "fas fa-bug"
    },
    {
        "value": "fas fa-building",
        "label": "fas fa-building"
    },
    {
        "value": "far fa-building",
        "label": "far fa-building"
    },
    {
        "value": "fas fa-bullhorn",
        "label": "fas fa-bullhorn"
    },
    {
        "value": "fas fa-bullseye",
        "label": "fas fa-bullseye"
    },
    {
        "value": "fab fa-buromobelexperte",
        "label": "fab fa-buromobelexperte"
    },
    {
        "value": "fas fa-bus",
        "label": "fas fa-bus"
    },
    {
        "value": "fab fa-buysellads",
        "label": "fab fa-buysellads"
    },
    {
        "value": "fas fa-calculator",
        "label": "fas fa-calculator"
    },
    {
        "value": "fas fa-calendar",
        "label": "fas fa-calendar"
    },
    {
        "value": "far fa-calendar",
        "label": "far fa-calendar"
    },
    {
        "value": "fas fa-calendar-alt",
        "label": "fas fa-calendar-alt"
    },
    {
        "value": "far fa-calendar-alt",
        "label": "far fa-calendar-alt"
    },
    {
        "value": "fas fa-calendar-check",
        "label": "fas fa-calendar-check"
    },
    {
        "value": "far fa-calendar-check",
        "label": "far fa-calendar-check"
    },
    {
        "value": "fas fa-calendar-minus",
        "label": "fas fa-calendar-minus"
    },
    {
        "value": "far fa-calendar-minus",
        "label": "far fa-calendar-minus"
    },
    {
        "value": "fas fa-calendar-plus",
        "label": "fas fa-calendar-plus"
    },
    {
        "value": "far fa-calendar-plus",
        "label": "far fa-calendar-plus"
    },
    {
        "value": "fas fa-calendar-times",
        "label": "fas fa-calendar-times"
    },
    {
        "value": "far fa-calendar-times",
        "label": "far fa-calendar-times"
    },
    {
        "value": "fas fa-camera",
        "label": "fas fa-camera"
    },
    {
        "value": "fas fa-camera-retro",
        "label": "fas fa-camera-retro"
    },
    {
        "value": "fas fa-car",
        "label": "fas fa-car"
    },
    {
        "value": "fas fa-caret-down",
        "label": "fas fa-caret-down"
    },
    {
        "value": "fas fa-caret-left",
        "label": "fas fa-caret-left"
    },
    {
        "value": "fas fa-caret-right",
        "label": "fas fa-caret-right"
    },
    {
        "value": "fas fa-caret-square-down",
        "label": "fas fa-caret-square-down"
    },
    {
        "value": "far fa-caret-square-down",
        "label": "far fa-caret-square-down"
    },
    {
        "value": "fas fa-caret-square-left",
        "label": "fas fa-caret-square-left"
    },
    {
        "value": "far fa-caret-square-left",
        "label": "far fa-caret-square-left"
    },
    {
        "value": "fas fa-caret-square-right",
        "label": "fas fa-caret-square-right"
    },
    {
        "value": "far fa-caret-square-right",
        "label": "far fa-caret-square-right"
    },
    {
        "value": "fas fa-caret-square-up",
        "label": "fas fa-caret-square-up"
    },
    {
        "value": "far fa-caret-square-up",
        "label": "far fa-caret-square-up"
    },
    {
        "value": "fas fa-caret-up",
        "label": "fas fa-caret-up"
    },
    {
        "value": "fas fa-cart-arrow-down",
        "label": "fas fa-cart-arrow-down"
    },
    {
        "value": "fas fa-cart-plus",
        "label": "fas fa-cart-plus"
    },
    {
        "value": "fab fa-cc-amex",
        "label": "fab fa-cc-amex"
    },
    {
        "value": "fab fa-cc-apple-pay",
        "label": "fab fa-cc-apple-pay"
    },
    {
        "value": "fab fa-cc-diners-club",
        "label": "fab fa-cc-diners-club"
    },
    {
        "value": "fab fa-cc-discover",
        "label": "fab fa-cc-discover"
    },
    {
        "value": "fab fa-cc-jcb",
        "label": "fab fa-cc-jcb"
    },
    {
        "value": "fab fa-cc-mastercard",
        "label": "fab fa-cc-mastercard"
    },
    {
        "value": "fab fa-cc-paypal",
        "label": "fab fa-cc-paypal"
    },
    {
        "value": "fab fa-cc-stripe",
        "label": "fab fa-cc-stripe"
    },
    {
        "value": "fab fa-cc-visa",
        "label": "fab fa-cc-visa"
    },
    {
        "value": "fab fa-centercode",
        "label": "fab fa-centercode"
    },
    {
        "value": "fas fa-certificate",
        "label": "fas fa-certificate"
    },
    {
        "value": "fas fa-chart-area",
        "label": "fas fa-chart-area"
    },
    {
        "value": "fas fa-chart-bar",
        "label": "fas fa-chart-bar"
    },
    {
        "value": "far fa-chart-bar",
        "label": "far fa-chart-bar"
    },
    {
        "value": "fas fa-chart-line",
        "label": "fas fa-chart-line"
    },
    {
        "value": "fas fa-chart-pie",
        "label": "fas fa-chart-pie"
    },
    {
        "value": "fas fa-check",
        "label": "fas fa-check"
    },
    {
        "value": "fas fa-check-circle",
        "label": "fas fa-check-circle"
    },
    {
        "value": "far fa-check-circle",
        "label": "far fa-check-circle"
    },
    {
        "value": "fas fa-check-square",
        "label": "fas fa-check-square"
    },
    {
        "value": "far fa-check-square",
        "label": "far fa-check-square"
    },
    {
        "value": "fas fa-chevron-circle-down",
        "label": "fas fa-chevron-circle-down"
    },
    {
        "value": "fas fa-chevron-circle-left",
        "label": "fas fa-chevron-circle-left"
    },
    {
        "value": "fas fa-chevron-circle-right",
        "label": "fas fa-chevron-circle-right"
    },
    {
        "value": "fas fa-chevron-circle-up",
        "label": "fas fa-chevron-circle-up"
    },
    {
        "value": "fas fa-chevron-down",
        "label": "fas fa-chevron-down"
    },
    {
        "value": "fas fa-chevron-left",
        "label": "fas fa-chevron-left"
    },
    {
        "value": "fas fa-chevron-right",
        "label": "fas fa-chevron-right"
    },
    {
        "value": "fas fa-chevron-up",
        "label": "fas fa-chevron-up"
    },
    {
        "value": "fas fa-child",
        "label": "fas fa-child"
    },
    {
        "value": "fab fa-chrome",
        "label": "fab fa-chrome"
    },
    {
        "value": "fas fa-circle",
        "label": "fas fa-circle"
    },
    {
        "value": "far fa-circle",
        "label": "far fa-circle"
    },
    {
        "value": "fas fa-circle-notch",
        "label": "fas fa-circle-notch"
    },
    {
        "value": "fas fa-clipboard",
        "label": "fas fa-clipboard"
    },
    {
        "value": "far fa-clipboard",
        "label": "far fa-clipboard"
    },
    {
        "value": "fas fa-clock",
        "label": "fas fa-clock"
    },
    {
        "value": "far fa-clock",
        "label": "far fa-clock"
    },
    {
        "value": "fas fa-clone",
        "label": "fas fa-clone"
    },
    {
        "value": "far fa-clone",
        "label": "far fa-clone"
    },
    {
        "value": "fas fa-closed-body1ing",
        "label": "fas fa-closed-body1ing"
    },
    {
        "value": "far fa-closed-body1ing",
        "label": "far fa-closed-body1ing"
    },
    {
        "value": "fas fa-cloud",
        "label": "fas fa-cloud"
    },
    {
        "value": "fas fa-cloud-download-alt",
        "label": "fas fa-cloud-download-alt"
    },
    {
        "value": "fas fa-cloud-upload-alt",
        "label": "fas fa-cloud-upload-alt"
    },
    {
        "value": "fab fa-cloudscale",
        "label": "fab fa-cloudscale"
    },
    {
        "value": "fab fa-cloudsmith",
        "label": "fab fa-cloudsmith"
    },
    {
        "value": "fab fa-cloudversify",
        "label": "fab fa-cloudversify"
    },
    {
        "value": "fas fa-code",
        "label": "fas fa-code"
    },
    {
        "value": "fas fa-code-branch",
        "label": "fas fa-code-branch"
    },
    {
        "value": "fab fa-codepen",
        "label": "fab fa-codepen"
    },
    {
        "value": "fab fa-codiepie",
        "label": "fab fa-codiepie"
    },
    {
        "value": "fas fa-coffee",
        "label": "fas fa-coffee"
    },
    {
        "value": "fas fa-cog",
        "label": "fas fa-cog"
    },
    {
        "value": "fas fa-cogs",
        "label": "fas fa-cogs"
    },
    {
        "value": "fas fa-columns",
        "label": "fas fa-columns"
    },
    {
        "value": "fas fa-comment",
        "label": "fas fa-comment"
    },
    {
        "value": "far fa-comment",
        "label": "far fa-comment"
    },
    {
        "value": "fas fa-comment-alt",
        "label": "fas fa-comment-alt"
    },
    {
        "value": "far fa-comment-alt",
        "label": "far fa-comment-alt"
    },
    {
        "value": "fas fa-comments",
        "label": "fas fa-comments"
    },
    {
        "value": "far fa-comments",
        "label": "far fa-comments"
    },
    {
        "value": "fas fa-compass",
        "label": "fas fa-compass"
    },
    {
        "value": "far fa-compass",
        "label": "far fa-compass"
    },
    {
        "value": "fas fa-compress",
        "label": "fas fa-compress"
    },
    {
        "value": "fab fa-connectdevelop",
        "label": "fab fa-connectdevelop"
    },
    {
        "value": "fab fa-contao",
        "label": "fab fa-contao"
    },
    {
        "value": "fas fa-copy",
        "label": "fas fa-copy"
    },
    {
        "value": "far fa-copy",
        "label": "far fa-copy"
    },
    {
        "value": "fas fa-copyright",
        "label": "fas fa-copyright"
    },
    {
        "value": "far fa-copyright",
        "label": "far fa-copyright"
    },
    {
        "value": "fab fa-cpanel",
        "label": "fab fa-cpanel"
    },
    {
        "value": "fab fa-creative-commons",
        "label": "fab fa-creative-commons"
    },
    {
        "value": "fas fa-credit-card",
        "label": "fas fa-credit-card"
    },
    {
        "value": "far fa-credit-card",
        "label": "far fa-credit-card"
    },
    {
        "value": "fas fa-crop",
        "label": "fas fa-crop"
    },
    {
        "value": "fas fa-crosshairs",
        "label": "fas fa-crosshairs"
    },
    {
        "value": "fab fa-css3",
        "label": "fab fa-css3"
    },
    {
        "value": "fab fa-css3-alt",
        "label": "fab fa-css3-alt"
    },
    {
        "value": "fas fa-cube",
        "label": "fas fa-cube"
    },
    {
        "value": "fas fa-cubes",
        "label": "fas fa-cubes"
    },
    {
        "value": "fas fa-cut",
        "label": "fas fa-cut"
    },
    {
        "value": "fab fa-cuttlefish",
        "label": "fab fa-cuttlefish"
    },
    {
        "value": "fab fa-d-and-d",
        "label": "fab fa-d-and-d"
    },
    {
        "value": "fab fa-dashcube",
        "label": "fab fa-dashcube"
    },
    {
        "value": "fas fa-database",
        "label": "fas fa-database"
    },
    {
        "value": "fas fa-deaf",
        "label": "fas fa-deaf"
    },
    {
        "value": "fab fa-delicious",
        "label": "fab fa-delicious"
    },
    {
        "value": "fab fa-deploydog",
        "label": "fab fa-deploydog"
    },
    {
        "value": "fab fa-deskpro",
        "label": "fab fa-deskpro"
    },
    {
        "value": "fas fa-desktop",
        "label": "fas fa-desktop"
    },
    {
        "value": "fab fa-deviantart",
        "label": "fab fa-deviantart"
    },
    {
        "value": "fab fa-digg",
        "label": "fab fa-digg"
    },
    {
        "value": "fab fa-digital-ocean",
        "label": "fab fa-digital-ocean"
    },
    {
        "value": "fab fa-discord",
        "label": "fab fa-discord"
    },
    {
        "value": "fab fa-discourse",
        "label": "fab fa-discourse"
    },
    {
        "value": "fab fa-dochub",
        "label": "fab fa-dochub"
    },
    {
        "value": "fab fa-docker",
        "label": "fab fa-docker"
    },
    {
        "value": "fas fa-dollar-sign",
        "label": "fas fa-dollar-sign"
    },
    {
        "value": "fas fa-dot-circle",
        "label": "fas fa-dot-circle"
    },
    {
        "value": "far fa-dot-circle",
        "label": "far fa-dot-circle"
    },
    {
        "value": "fas fa-download",
        "label": "fas fa-download"
    },
    {
        "value": "fab fa-draft2digital",
        "label": "fab fa-draft2digital"
    },
    {
        "value": "fab fa-dribbble",
        "label": "fab fa-dribbble"
    },
    {
        "value": "fab fa-dribbble-square",
        "label": "fab fa-dribbble-square"
    },
    {
        "value": "fab fa-dropbox",
        "label": "fab fa-dropbox"
    },
    {
        "value": "fab fa-drupal",
        "label": "fab fa-drupal"
    },
    {
        "value": "fab fa-dyalog",
        "label": "fab fa-dyalog"
    },
    {
        "value": "fab fa-earlybirds",
        "label": "fab fa-earlybirds"
    },
    {
        "value": "fab fa-edge",
        "label": "fab fa-edge"
    },
    {
        "value": "fas fa-edit",
        "label": "fas fa-edit"
    },
    {
        "value": "far fa-edit",
        "label": "far fa-edit"
    },
    {
        "value": "fas fa-eject",
        "label": "fas fa-eject"
    },
    {
        "value": "fas fa-ellipsis-h",
        "label": "fas fa-ellipsis-h"
    },
    {
        "value": "fas fa-ellipsis-v",
        "label": "fas fa-ellipsis-v"
    },
    {
        "value": "fab fa-ember",
        "label": "fab fa-ember"
    },
    {
        "value": "fab fa-empire",
        "label": "fab fa-empire"
    },
    {
        "value": "fas fa-envelope",
        "label": "fas fa-envelope"
    },
    {
        "value": "far fa-envelope",
        "label": "far fa-envelope"
    },
    {
        "value": "fas fa-envelope-open",
        "label": "fas fa-envelope-open"
    },
    {
        "value": "far fa-envelope-open",
        "label": "far fa-envelope-open"
    },
    {
        "value": "fas fa-envelope-square",
        "label": "fas fa-envelope-square"
    },
    {
        "value": "fab fa-envira",
        "label": "fab fa-envira"
    },
    {
        "value": "fas fa-eraser",
        "label": "fas fa-eraser"
    },
    {
        "value": "fab fa-erlang",
        "label": "fab fa-erlang"
    },
    {
        "value": "fab fa-etsy",
        "label": "fab fa-etsy"
    },
    {
        "value": "fas fa-euro-sign",
        "label": "fas fa-euro-sign"
    },
    {
        "value": "fas fa-exchange-alt",
        "label": "fas fa-exchange-alt"
    },
    {
        "value": "fas fa-exclamation",
        "label": "fas fa-exclamation"
    },
    {
        "value": "fas fa-exclamation-circle",
        "label": "fas fa-exclamation-circle"
    },
    {
        "value": "fas fa-exclamation-triangle",
        "label": "fas fa-exclamation-triangle"
    },
    {
        "value": "fas fa-expand",
        "label": "fas fa-expand"
    },
    {
        "value": "fas fa-expand-arrows-alt",
        "label": "fas fa-expand-arrows-alt"
    },
    {
        "value": "fab fa-expeditedssl",
        "label": "fab fa-expeditedssl"
    },
    {
        "value": "fas fa-external-link-alt",
        "label": "fas fa-external-link-alt"
    },
    {
        "value": "fas fa-external-link-square-alt",
        "label": "fas fa-external-link-square-alt"
    },
    {
        "value": "fas fa-eye",
        "label": "fas fa-eye"
    },
    {
        "value": "fas fa-eye-dropper",
        "label": "fas fa-eye-dropper"
    },
    {
        "value": "fas fa-eye-slash",
        "label": "fas fa-eye-slash"
    },
    {
        "value": "far fa-eye-slash",
        "label": "far fa-eye-slash"
    },
    {
        "value": "fab fa-facebook",
        "label": "fab fa-facebook"
    },
    {
        "value": "fab fa-facebook-f",
        "label": "fab fa-facebook-f"
    },
    {
        "value": "fab fa-facebook-messenger",
        "label": "fab fa-facebook-messenger"
    },
    {
        "value": "fab fa-facebook-square",
        "label": "fab fa-facebook-square"
    },
    {
        "value": "fas fa-fast-backward",
        "label": "fas fa-fast-backward"
    },
    {
        "value": "fas fa-fast-forward",
        "label": "fas fa-fast-forward"
    },
    {
        "value": "fas fa-fax",
        "label": "fas fa-fax"
    },
    {
        "value": "fas fa-female",
        "label": "fas fa-female"
    },
    {
        "value": "fas fa-fighter-jet",
        "label": "fas fa-fighter-jet"
    },
    {
        "value": "fas fa-file",
        "label": "fas fa-file"
    },
    {
        "value": "far fa-file",
        "label": "far fa-file"
    },
    {
        "value": "fas fa-file-alt",
        "label": "fas fa-file-alt"
    },
    {
        "value": "far fa-file-alt",
        "label": "far fa-file-alt"
    },
    {
        "value": "fas fa-file-archive",
        "label": "fas fa-file-archive"
    },
    {
        "value": "far fa-file-archive",
        "label": "far fa-file-archive"
    },
    {
        "value": "fas fa-file-audio",
        "label": "fas fa-file-audio"
    },
    {
        "value": "far fa-file-audio",
        "label": "far fa-file-audio"
    },
    {
        "value": "fas fa-file-code",
        "label": "fas fa-file-code"
    },
    {
        "value": "far fa-file-code",
        "label": "far fa-file-code"
    },
    {
        "value": "fas fa-file-excel",
        "label": "fas fa-file-excel"
    },
    {
        "value": "far fa-file-excel",
        "label": "far fa-file-excel"
    },
    {
        "value": "fas fa-file-image",
        "label": "fas fa-file-image"
    },
    {
        "value": "far fa-file-image",
        "label": "far fa-file-image"
    },
    {
        "value": "fas fa-file-pdf",
        "label": "fas fa-file-pdf"
    },
    {
        "value": "far fa-file-pdf",
        "label": "far fa-file-pdf"
    },
    {
        "value": "fas fa-file-powerpoint",
        "label": "fas fa-file-powerpoint"
    },
    {
        "value": "far fa-file-powerpoint",
        "label": "far fa-file-powerpoint"
    },
    {
        "value": "fas fa-file-video",
        "label": "fas fa-file-video"
    },
    {
        "value": "far fa-file-video",
        "label": "far fa-file-video"
    },
    {
        "value": "fas fa-file-word",
        "label": "fas fa-file-word"
    },
    {
        "value": "far fa-file-word",
        "label": "far fa-file-word"
    },
    {
        "value": "fas fa-film",
        "label": "fas fa-film"
    },
    {
        "value": "fas fa-filter",
        "label": "fas fa-filter"
    },
    {
        "value": "fas fa-fire",
        "label": "fas fa-fire"
    },
    {
        "value": "fas fa-fire-extinguisher",
        "label": "fas fa-fire-extinguisher"
    },
    {
        "value": "fab fa-firefox",
        "label": "fab fa-firefox"
    },
    {
        "value": "fab fa-first-order",
        "label": "fab fa-first-order"
    },
    {
        "value": "fab fa-firstdraft",
        "label": "fab fa-firstdraft"
    },
    {
        "value": "fas fa-flag",
        "label": "fas fa-flag"
    },
    {
        "value": "far fa-flag",
        "label": "far fa-flag"
    },
    {
        "value": "fas fa-flag-checkered",
        "label": "fas fa-flag-checkered"
    },
    {
        "value": "fas fa-flask",
        "label": "fas fa-flask"
    },
    {
        "value": "fab fa-flickr",
        "label": "fab fa-flickr"
    },
    {
        "value": "fab fa-fly",
        "label": "fab fa-fly"
    },
    {
        "value": "fas fa-folder",
        "label": "fas fa-folder"
    },
    {
        "value": "far fa-folder",
        "label": "far fa-folder"
    },
    {
        "value": "fas fa-folder-open",
        "label": "fas fa-folder-open"
    },
    {
        "value": "far fa-folder-open",
        "label": "far fa-folder-open"
    },
    {
        "value": "fas fa-font",
        "label": "fas fa-font"
    },
    {
        "value": "fab fa-font-awesome",
        "label": "fab fa-font-awesome"
    },
    {
        "value": "fab fa-font-awesome-alt",
        "label": "fab fa-font-awesome-alt"
    },
    {
        "value": "fab fa-font-awesome-flag",
        "label": "fab fa-font-awesome-flag"
    },
    {
        "value": "fab fa-fonticons",
        "label": "fab fa-fonticons"
    },
    {
        "value": "fab fa-fonticons-fi",
        "label": "fab fa-fonticons-fi"
    },
    {
        "value": "fab fa-fort-awesome",
        "label": "fab fa-fort-awesome"
    },
    {
        "value": "fab fa-fort-awesome-alt",
        "label": "fab fa-fort-awesome-alt"
    },
    {
        "value": "fab fa-forumbee",
        "label": "fab fa-forumbee"
    },
    {
        "value": "fas fa-forward",
        "label": "fas fa-forward"
    },
    {
        "value": "fab fa-foursquare",
        "label": "fab fa-foursquare"
    },
    {
        "value": "fab fa-free-code-camp",
        "label": "fab fa-free-code-camp"
    },
    {
        "value": "fab fa-freebsd",
        "label": "fab fa-freebsd"
    },
    {
        "value": "fas fa-frown",
        "label": "fas fa-frown"
    },
    {
        "value": "far fa-frown",
        "label": "far fa-frown"
    },
    {
        "value": "fas fa-futbol",
        "label": "fas fa-futbol"
    },
    {
        "value": "far fa-futbol",
        "label": "far fa-futbol"
    },
    {
        "value": "fas fa-gamepad",
        "label": "fas fa-gamepad"
    },
    {
        "value": "fas fa-gavel",
        "label": "fas fa-gavel"
    },
    {
        "value": "fas fa-gem",
        "label": "fas fa-gem"
    },
    {
        "value": "far fa-gem",
        "label": "far fa-gem"
    },
    {
        "value": "fas fa-genderless",
        "label": "fas fa-genderless"
    },
    {
        "value": "fab fa-get-pocket",
        "label": "fab fa-get-pocket"
    },
    {
        "value": "fab fa-gg",
        "label": "fab fa-gg"
    },
    {
        "value": "fab fa-gg-circle",
        "label": "fab fa-gg-circle"
    },
    {
        "value": "fas fa-gift",
        "label": "fas fa-gift"
    },
    {
        "value": "fab fa-git",
        "label": "fab fa-git"
    },
    {
        "value": "fab fa-git-square",
        "label": "fab fa-git-square"
    },
    {
        "value": "fab fa-github",
        "label": "fab fa-github"
    },
    {
        "value": "fab fa-github-alt",
        "label": "fab fa-github-alt"
    },
    {
        "value": "fab fa-github-square",
        "label": "fab fa-github-square"
    },
    {
        "value": "fab fa-gitkraken",
        "label": "fab fa-gitkraken"
    },
    {
        "value": "fab fa-gitlab",
        "label": "fab fa-gitlab"
    },
    {
        "value": "fab fa-gitter",
        "label": "fab fa-gitter"
    },
    {
        "value": "fas fa-glass-martini",
        "label": "fas fa-glass-martini"
    },
    {
        "value": "fab fa-glide",
        "label": "fab fa-glide"
    },
    {
        "value": "fab fa-glide-g",
        "label": "fab fa-glide-g"
    },
    {
        "value": "fas fa-globe",
        "label": "fas fa-globe"
    },
    {
        "value": "fab fa-gofore",
        "label": "fab fa-gofore"
    },
    {
        "value": "fab fa-goodreads",
        "label": "fab fa-goodreads"
    },
    {
        "value": "fab fa-goodreads-g",
        "label": "fab fa-goodreads-g"
    },
    {
        "value": "fab fa-google",
        "label": "fab fa-google"
    },
    {
        "value": "fab fa-google-drive",
        "label": "fab fa-google-drive"
    },
    {
        "value": "fab fa-google-play",
        "label": "fab fa-google-play"
    },
    {
        "value": "fab fa-google-plus",
        "label": "fab fa-google-plus"
    },
    {
        "value": "fab fa-google-plus-g",
        "label": "fab fa-google-plus-g"
    },
    {
        "value": "fab fa-google-plus-square",
        "label": "fab fa-google-plus-square"
    },
    {
        "value": "fab fa-google-wallet",
        "label": "fab fa-google-wallet"
    },
    {
        "value": "fas fa-graduation-cap",
        "label": "fas fa-graduation-cap"
    },
    {
        "value": "fab fa-gratipay",
        "label": "fab fa-gratipay"
    },
    {
        "value": "fab fa-grav",
        "label": "fab fa-grav"
    },
    {
        "value": "fab fa-gripfire",
        "label": "fab fa-gripfire"
    },
    {
        "value": "fab fa-grunt",
        "label": "fab fa-grunt"
    },
    {
        "value": "fab fa-gulp",
        "label": "fab fa-gulp"
    },
    {
        "value": "fas fa-h-square",
        "label": "fas fa-h-square"
    },
    {
        "value": "fab fa-hacker-news",
        "label": "fab fa-hacker-news"
    },
    {
        "value": "fab fa-hacker-news-square",
        "label": "fab fa-hacker-news-square"
    },
    {
        "value": "fas fa-hand-lizard",
        "label": "fas fa-hand-lizard"
    },
    {
        "value": "far fa-hand-lizard",
        "label": "far fa-hand-lizard"
    },
    {
        "value": "fas fa-hand-paper",
        "label": "fas fa-hand-paper"
    },
    {
        "value": "far fa-hand-paper",
        "label": "far fa-hand-paper"
    },
    {
        "value": "fas fa-hand-peace",
        "label": "fas fa-hand-peace"
    },
    {
        "value": "far fa-hand-peace",
        "label": "far fa-hand-peace"
    },
    {
        "value": "fas fa-hand-point-down",
        "label": "fas fa-hand-point-down"
    },
    {
        "value": "far fa-hand-point-down",
        "label": "far fa-hand-point-down"
    },
    {
        "value": "fas fa-hand-point-left",
        "label": "fas fa-hand-point-left"
    },
    {
        "value": "far fa-hand-point-left",
        "label": "far fa-hand-point-left"
    },
    {
        "value": "fas fa-hand-point-right",
        "label": "fas fa-hand-point-right"
    },
    {
        "value": "far fa-hand-point-right",
        "label": "far fa-hand-point-right"
    },
    {
        "value": "fas fa-hand-point-up",
        "label": "fas fa-hand-point-up"
    },
    {
        "value": "far fa-hand-point-up",
        "label": "far fa-hand-point-up"
    },
    {
        "value": "fas fa-hand-pointer",
        "label": "fas fa-hand-pointer"
    },
    {
        "value": "far fa-hand-pointer",
        "label": "far fa-hand-pointer"
    },
    {
        "value": "fas fa-hand-rock",
        "label": "fas fa-hand-rock"
    },
    {
        "value": "far fa-hand-rock",
        "label": "far fa-hand-rock"
    },
    {
        "value": "fas fa-hand-scissors",
        "label": "fas fa-hand-scissors"
    },
    {
        "value": "far fa-hand-scissors",
        "label": "far fa-hand-scissors"
    },
    {
        "value": "fas fa-hand-spock",
        "label": "fas fa-hand-spock"
    },
    {
        "value": "far fa-hand-spock",
        "label": "far fa-hand-spock"
    },
    {
        "value": "fas fa-handshake",
        "label": "fas fa-handshake"
    },
    {
        "value": "far fa-handshake",
        "label": "far fa-handshake"
    },
    {
        "value": "fas fa-hashtag",
        "label": "fas fa-hashtag"
    },
    {
        "value": "fas fa-hdd",
        "label": "fas fa-hdd"
    },
    {
        "value": "far fa-hdd",
        "label": "far fa-hdd"
    },
    {
        "value": "fas fa-heading",
        "label": "fas fa-heading"
    },
    {
        "value": "fas fa-headphones",
        "label": "fas fa-headphones"
    },
    {
        "value": "fas fa-heart",
        "label": "fas fa-heart"
    },
    {
        "value": "far fa-heart",
        "label": "far fa-heart"
    },
    {
        "value": "fas fa-heartbeat",
        "label": "fas fa-heartbeat"
    },
    {
        "value": "fab fa-hire-a-helper",
        "label": "fab fa-hire-a-helper"
    },
    {
        "value": "fas fa-history",
        "label": "fas fa-history"
    },
    {
        "value": "fas fa-home",
        "label": "fas fa-home"
    },
    {
        "value": "fab fa-hooli",
        "label": "fab fa-hooli"
    },
    {
        "value": "fas fa-hospital",
        "label": "fas fa-hospital"
    },
    {
        "value": "far fa-hospital",
        "label": "far fa-hospital"
    },
    {
        "value": "fab fa-hotjar",
        "label": "fab fa-hotjar"
    },
    {
        "value": "fas fa-hourglass",
        "label": "fas fa-hourglass"
    },
    {
        "value": "far fa-hourglass",
        "label": "far fa-hourglass"
    },
    {
        "value": "fas fa-hourglass-end",
        "label": "fas fa-hourglass-end"
    },
    {
        "value": "fas fa-hourglass-half",
        "label": "fas fa-hourglass-half"
    },
    {
        "value": "fas fa-hourglass-start",
        "label": "fas fa-hourglass-start"
    },
    {
        "value": "fab fa-houzz",
        "label": "fab fa-houzz"
    },
    {
        "value": "fab fa-html5",
        "label": "fab fa-html5"
    },
    {
        "value": "fab fa-hubspot",
        "label": "fab fa-hubspot"
    },
    {
        "value": "fas fa-i-cursor",
        "label": "fas fa-i-cursor"
    },
    {
        "value": "fas fa-id-badge",
        "label": "fas fa-id-badge"
    },
    {
        "value": "far fa-id-badge",
        "label": "far fa-id-badge"
    },
    {
        "value": "fas fa-id-card",
        "label": "fas fa-id-card"
    },
    {
        "value": "far fa-id-card",
        "label": "far fa-id-card"
    },
    {
        "value": "fas fa-image",
        "label": "fas fa-image"
    },
    {
        "value": "far fa-image",
        "label": "far fa-image"
    },
    {
        "value": "fas fa-images",
        "label": "fas fa-images"
    },
    {
        "value": "far fa-images",
        "label": "far fa-images"
    },
    {
        "value": "fab fa-imdb",
        "label": "fab fa-imdb"
    },
    {
        "value": "fas fa-inbox",
        "label": "fas fa-inbox"
    },
    {
        "value": "fas fa-indent",
        "label": "fas fa-indent"
    },
    {
        "value": "fas fa-industry",
        "label": "fas fa-industry"
    },
    {
        "value": "fas fa-info",
        "label": "fas fa-info"
    },
    {
        "value": "fas fa-info-circle",
        "label": "fas fa-info-circle"
    },
    {
        "value": "fab fa-instagram",
        "label": "fab fa-instagram"
    },
    {
        "value": "fab fa-internet-explorer",
        "label": "fab fa-internet-explorer"
    },
    {
        "value": "fab fa-ioxhost",
        "label": "fab fa-ioxhost"
    },
    {
        "value": "fas fa-italic",
        "label": "fas fa-italic"
    },
    {
        "value": "fab fa-itunes",
        "label": "fab fa-itunes"
    },
    {
        "value": "fab fa-itunes-note",
        "label": "fab fa-itunes-note"
    },
    {
        "value": "fab fa-jenkins",
        "label": "fab fa-jenkins"
    },
    {
        "value": "fab fa-joget",
        "label": "fab fa-joget"
    },
    {
        "value": "fab fa-joomla",
        "label": "fab fa-joomla"
    },
    {
        "value": "fab fa-js",
        "label": "fab fa-js"
    },
    {
        "value": "fab fa-js-square",
        "label": "fab fa-js-square"
    },
    {
        "value": "fab fa-jsfiddle",
        "label": "fab fa-jsfiddle"
    },
    {
        "value": "fas fa-key",
        "label": "fas fa-key"
    },
    {
        "value": "fas fa-keyboard",
        "label": "fas fa-keyboard"
    },
    {
        "value": "far fa-keyboard",
        "label": "far fa-keyboard"
    },
    {
        "value": "fab fa-keycdn",
        "label": "fab fa-keycdn"
    },
    {
        "value": "fab fa-kickstarter",
        "label": "fab fa-kickstarter"
    },
    {
        "value": "fab fa-kickstarter-k",
        "label": "fab fa-kickstarter-k"
    },
    {
        "value": "fas fa-language",
        "label": "fas fa-language"
    },
    {
        "value": "fas fa-laptop",
        "label": "fas fa-laptop"
    },
    {
        "value": "fab fa-laravel",
        "label": "fab fa-laravel"
    },
    {
        "value": "fab fa-lastfm",
        "label": "fab fa-lastfm"
    },
    {
        "value": "fab fa-lastfm-square",
        "label": "fab fa-lastfm-square"
    },
    {
        "value": "fas fa-leaf",
        "label": "fas fa-leaf"
    },
    {
        "value": "fab fa-leanpub",
        "label": "fab fa-leanpub"
    },
    {
        "value": "fas fa-lemon",
        "label": "fas fa-lemon"
    },
    {
        "value": "far fa-lemon",
        "label": "far fa-lemon"
    },
    {
        "value": "fab fa-less",
        "label": "fab fa-less"
    },
    {
        "value": "fas fa-level-down-alt",
        "label": "fas fa-level-down-alt"
    },
    {
        "value": "fas fa-level-up-alt",
        "label": "fas fa-level-up-alt"
    },
    {
        "value": "fas fa-life-ring",
        "label": "fas fa-life-ring"
    },
    {
        "value": "far fa-life-ring",
        "label": "far fa-life-ring"
    },
    {
        "value": "fas fa-lightbulb",
        "label": "fas fa-lightbulb"
    },
    {
        "value": "far fa-lightbulb",
        "label": "far fa-lightbulb"
    },
    {
        "value": "fab fa-line",
        "label": "fab fa-line"
    },
    {
        "value": "fas fa-link",
        "label": "fas fa-link"
    },
    {
        "value": "fab fa-linkedin",
        "label": "fab fa-linkedin"
    },
    {
        "value": "fab fa-linkedin-in",
        "label": "fab fa-linkedin-in"
    },
    {
        "value": "fab fa-linode",
        "label": "fab fa-linode"
    },
    {
        "value": "fab fa-linux",
        "label": "fab fa-linux"
    },
    {
        "value": "fas fa-lira-sign",
        "label": "fas fa-lira-sign"
    },
    {
        "value": "fas fa-list",
        "label": "fas fa-list"
    },
    {
        "value": "fas fa-list-alt",
        "label": "fas fa-list-alt"
    },
    {
        "value": "far fa-list-alt",
        "label": "far fa-list-alt"
    },
    {
        "value": "fas fa-list-ol",
        "label": "fas fa-list-ol"
    },
    {
        "value": "fas fa-list-ul",
        "label": "fas fa-list-ul"
    },
    {
        "value": "fas fa-location-arrow",
        "label": "fas fa-location-arrow"
    },
    {
        "value": "fas fa-lock",
        "label": "fas fa-lock"
    },
    {
        "value": "fas fa-lock-open",
        "label": "fas fa-lock-open"
    },
    {
        "value": "fas fa-long-arrow-alt-down",
        "label": "fas fa-long-arrow-alt-down"
    },
    {
        "value": "fas fa-long-arrow-alt-left",
        "label": "fas fa-long-arrow-alt-left"
    },
    {
        "value": "fas fa-long-arrow-alt-right",
        "label": "fas fa-long-arrow-alt-right"
    },
    {
        "value": "fas fa-long-arrow-alt-up",
        "label": "fas fa-long-arrow-alt-up"
    },
    {
        "value": "fas fa-low-vision",
        "label": "fas fa-low-vision"
    },
    {
        "value": "fab fa-lyft",
        "label": "fab fa-lyft"
    },
    {
        "value": "fab fa-magento",
        "label": "fab fa-magento"
    },
    {
        "value": "fas fa-magic",
        "label": "fas fa-magic"
    },
    {
        "value": "fas fa-magnet",
        "label": "fas fa-magnet"
    },
    {
        "value": "fas fa-male",
        "label": "fas fa-male"
    },
    {
        "value": "fas fa-map",
        "label": "fas fa-map"
    },
    {
        "value": "far fa-map",
        "label": "far fa-map"
    },
    {
        "value": "fas fa-map-marker",
        "label": "fas fa-map-marker"
    },
    {
        "value": "fas fa-map-marker-alt",
        "label": "fas fa-map-marker-alt"
    },
    {
        "value": "fas fa-map-pin",
        "label": "fas fa-map-pin"
    },
    {
        "value": "fas fa-map-signs",
        "label": "fas fa-map-signs"
    },
    {
        "value": "fas fa-mars",
        "label": "fas fa-mars"
    },
    {
        "value": "fas fa-mars-double",
        "label": "fas fa-mars-double"
    },
    {
        "value": "fas fa-mars-stroke",
        "label": "fas fa-mars-stroke"
    },
    {
        "value": "fas fa-mars-stroke-h",
        "label": "fas fa-mars-stroke-h"
    },
    {
        "value": "fas fa-mars-stroke-v",
        "label": "fas fa-mars-stroke-v"
    },
    {
        "value": "fab fa-maxcdn",
        "label": "fab fa-maxcdn"
    },
    {
        "value": "fab fa-medapps",
        "label": "fab fa-medapps"
    },
    {
        "value": "fab fa-medium",
        "label": "fab fa-medium"
    },
    {
        "value": "fab fa-medium-m",
        "label": "fab fa-medium-m"
    },
    {
        "value": "fas fa-medkit",
        "label": "fas fa-medkit"
    },
    {
        "value": "fab fa-medrt",
        "label": "fab fa-medrt"
    },
    {
        "value": "fab fa-meetup",
        "label": "fab fa-meetup"
    },
    {
        "value": "fas fa-meh",
        "label": "fas fa-meh"
    },
    {
        "value": "far fa-meh",
        "label": "far fa-meh"
    },
    {
        "value": "fas fa-mercury",
        "label": "fas fa-mercury"
    },
    {
        "value": "fas fa-microchip",
        "label": "fas fa-microchip"
    },
    {
        "value": "fas fa-microphone",
        "label": "fas fa-microphone"
    },
    {
        "value": "fas fa-microphone-slash",
        "label": "fas fa-microphone-slash"
    },
    {
        "value": "fab fa-microsoft",
        "label": "fab fa-microsoft"
    },
    {
        "value": "fas fa-minus",
        "label": "fas fa-minus"
    },
    {
        "value": "fas fa-minus-circle",
        "label": "fas fa-minus-circle"
    },
    {
        "value": "fas fa-minus-square",
        "label": "fas fa-minus-square"
    },
    {
        "value": "far fa-minus-square",
        "label": "far fa-minus-square"
    },
    {
        "value": "fab fa-mix",
        "label": "fab fa-mix"
    },
    {
        "value": "fab fa-mixcloud",
        "label": "fab fa-mixcloud"
    },
    {
        "value": "fab fa-mizuni",
        "label": "fab fa-mizuni"
    },
    {
        "value": "fas fa-mobile",
        "label": "fas fa-mobile"
    },
    {
        "value": "fas fa-mobile-alt",
        "label": "fas fa-mobile-alt"
    },
    {
        "value": "fab fa-modx",
        "label": "fab fa-modx"
    },
    {
        "value": "fab fa-monero",
        "label": "fab fa-monero"
    },
    {
        "value": "fas fa-money-bill-alt",
        "label": "fas fa-money-bill-alt"
    },
    {
        "value": "far fa-money-bill-alt",
        "label": "far fa-money-bill-alt"
    },
    {
        "value": "fas fa-moon",
        "label": "fas fa-moon"
    },
    {
        "value": "far fa-moon",
        "label": "far fa-moon"
    },
    {
        "value": "fas fa-motorcycle",
        "label": "fas fa-motorcycle"
    },
    {
        "value": "fas fa-mouse-pointer",
        "label": "fas fa-mouse-pointer"
    },
    {
        "value": "fas fa-music",
        "label": "fas fa-music"
    },
    {
        "value": "fab fa-napster",
        "label": "fab fa-napster"
    },
    {
        "value": "fas fa-neuter",
        "label": "fas fa-neuter"
    },
    {
        "value": "fas fa-newspaper",
        "label": "fas fa-newspaper"
    },
    {
        "value": "far fa-newspaper",
        "label": "far fa-newspaper"
    },
    {
        "value": "fab fa-nintendo-switch",
        "label": "fab fa-nintendo-switch"
    },
    {
        "value": "fab fa-node",
        "label": "fab fa-node"
    },
    {
        "value": "fab fa-node-js",
        "label": "fab fa-node-js"
    },
    {
        "value": "fab fa-npm",
        "label": "fab fa-npm"
    },
    {
        "value": "fab fa-ns8",
        "label": "fab fa-ns8"
    },
    {
        "value": "fab fa-nutritionix",
        "label": "fab fa-nutritionix"
    },
    {
        "value": "fas fa-object-group",
        "label": "fas fa-object-group"
    },
    {
        "value": "far fa-object-group",
        "label": "far fa-object-group"
    },
    {
        "value": "fas fa-object-ungroup",
        "label": "fas fa-object-ungroup"
    },
    {
        "value": "far fa-object-ungroup",
        "label": "far fa-object-ungroup"
    },
    {
        "value": "fab fa-odnoklassniki",
        "label": "fab fa-odnoklassniki"
    },
    {
        "value": "fab fa-odnoklassniki-square",
        "label": "fab fa-odnoklassniki-square"
    },
    {
        "value": "fab fa-opencart",
        "label": "fab fa-opencart"
    },
    {
        "value": "fab fa-openid",
        "label": "fab fa-openid"
    },
    {
        "value": "fab fa-opera",
        "label": "fab fa-opera"
    },
    {
        "value": "fab fa-optin-monster",
        "label": "fab fa-optin-monster"
    },
    {
        "value": "fab fa-osi",
        "label": "fab fa-osi"
    },
    {
        "value": "fas fa-outdent",
        "label": "fas fa-outdent"
    },
    {
        "value": "fab fa-page4",
        "label": "fab fa-page4"
    },
    {
        "value": "fab fa-pagelines",
        "label": "fab fa-pagelines"
    },
    {
        "value": "fas fa-paint-brush",
        "label": "fas fa-paint-brush"
    },
    {
        "value": "fab fa-palfed",
        "label": "fab fa-palfed"
    },
    {
        "value": "fas fa-paper-plane",
        "label": "fas fa-paper-plane"
    },
    {
        "value": "far fa-paper-plane",
        "label": "far fa-paper-plane"
    },
    {
        "value": "fas fa-paperclip",
        "label": "fas fa-paperclip"
    },
    {
        "value": "fas fa-paragraph",
        "label": "fas fa-paragraph"
    },
    {
        "value": "fas fa-paste",
        "label": "fas fa-paste"
    },
    {
        "value": "fab fa-patreon",
        "label": "fab fa-patreon"
    },
    {
        "value": "fas fa-pause",
        "label": "fas fa-pause"
    },
    {
        "value": "fas fa-pause-circle",
        "label": "fas fa-pause-circle"
    },
    {
        "value": "far fa-pause-circle",
        "label": "far fa-pause-circle"
    },
    {
        "value": "fas fa-paw",
        "label": "fas fa-paw"
    },
    {
        "value": "fab fa-paypal",
        "label": "fab fa-paypal"
    },
    {
        "value": "fas fa-pen-square",
        "label": "fas fa-pen-square"
    },
    {
        "value": "fas fa-pencil-alt",
        "label": "fas fa-pencil-alt"
    },
    {
        "value": "fas fa-percent",
        "label": "fas fa-percent"
    },
    {
        "value": "fab fa-periscope",
        "label": "fab fa-periscope"
    },
    {
        "value": "fab fa-phabricator",
        "label": "fab fa-phabricator"
    },
    {
        "value": "fab fa-phoenix-framework",
        "label": "fab fa-phoenix-framework"
    },
    {
        "value": "fas fa-phone",
        "label": "fas fa-phone"
    },
    {
        "value": "fas fa-phone-square",
        "label": "fas fa-phone-square"
    },
    {
        "value": "fas fa-phone-volume",
        "label": "fas fa-phone-volume"
    },
    {
        "value": "fab fa-pied-piper",
        "label": "fab fa-pied-piper"
    },
    {
        "value": "fab fa-pied-piper-alt",
        "label": "fab fa-pied-piper-alt"
    },
    {
        "value": "fab fa-pied-piper-pp",
        "label": "fab fa-pied-piper-pp"
    },
    {
        "value": "fab fa-pinterest",
        "label": "fab fa-pinterest"
    },
    {
        "value": "fab fa-pinterest-p",
        "label": "fab fa-pinterest-p"
    },
    {
        "value": "fab fa-pinterest-square",
        "label": "fab fa-pinterest-square"
    },
    {
        "value": "fas fa-plane",
        "label": "fas fa-plane"
    },
    {
        "value": "fas fa-play",
        "label": "fas fa-play"
    },
    {
        "value": "fas fa-play-circle",
        "label": "fas fa-play-circle"
    },
    {
        "value": "far fa-play-circle",
        "label": "far fa-play-circle"
    },
    {
        "value": "fab fa-playstation",
        "label": "fab fa-playstation"
    },
    {
        "value": "fas fa-plug",
        "label": "fas fa-plug"
    },
    {
        "value": "fas fa-plus",
        "label": "fas fa-plus"
    },
    {
        "value": "fas fa-plus-circle",
        "label": "fas fa-plus-circle"
    },
    {
        "value": "fas fa-plus-square",
        "label": "fas fa-plus-square"
    },
    {
        "value": "far fa-plus-square",
        "label": "far fa-plus-square"
    },
    {
        "value": "fas fa-podcast",
        "label": "fas fa-podcast"
    },
    {
        "value": "fas fa-pound-sign",
        "label": "fas fa-pound-sign"
    },
    {
        "value": "fas fa-power-off",
        "label": "fas fa-power-off"
    },
    {
        "value": "fas fa-print",
        "label": "fas fa-print"
    },
    {
        "value": "fab fa-product-hunt",
        "label": "fab fa-product-hunt"
    },
    {
        "value": "fab fa-pushed",
        "label": "fab fa-pushed"
    },
    {
        "value": "fas fa-puzzle-piece",
        "label": "fas fa-puzzle-piece"
    },
    {
        "value": "fab fa-python",
        "label": "fab fa-python"
    },
    {
        "value": "fab fa-qq",
        "label": "fab fa-qq"
    },
    {
        "value": "fas fa-qrcode",
        "label": "fas fa-qrcode"
    },
    {
        "value": "fas fa-question",
        "label": "fas fa-question"
    },
    {
        "value": "fas fa-question-circle",
        "label": "fas fa-question-circle"
    },
    {
        "value": "far fa-question-circle",
        "label": "far fa-question-circle"
    },
    {
        "value": "fab fa-quora",
        "label": "fab fa-quora"
    },
    {
        "value": "fas fa-quote-left",
        "label": "fas fa-quote-left"
    },
    {
        "value": "fas fa-quote-right",
        "label": "fas fa-quote-right"
    },
    {
        "value": "fas fa-random",
        "label": "fas fa-random"
    },
    {
        "value": "fab fa-ravelry",
        "label": "fab fa-ravelry"
    },
    {
        "value": "fab fa-react",
        "label": "fab fa-react"
    },
    {
        "value": "fab fa-rebel",
        "label": "fab fa-rebel"
    },
    {
        "value": "fas fa-recycle",
        "label": "fas fa-recycle"
    },
    {
        "value": "fab fa-red-river",
        "label": "fab fa-red-river"
    },
    {
        "value": "fab fa-reddit",
        "label": "fab fa-reddit"
    },
    {
        "value": "fab fa-reddit-alien",
        "label": "fab fa-reddit-alien"
    },
    {
        "value": "fab fa-reddit-square",
        "label": "fab fa-reddit-square"
    },
    {
        "value": "fas fa-redo",
        "label": "fas fa-redo"
    },
    {
        "value": "fas fa-redo-alt",
        "label": "fas fa-redo-alt"
    },
    {
        "value": "fas fa-registered",
        "label": "fas fa-registered"
    },
    {
        "value": "far fa-registered",
        "label": "far fa-registered"
    },
    {
        "value": "fab fa-rendact",
        "label": "fab fa-rendact"
    },
    {
        "value": "fab fa-renren",
        "label": "fab fa-renren"
    },
    {
        "value": "fas fa-reply",
        "label": "fas fa-reply"
    },
    {
        "value": "fas fa-reply-all",
        "label": "fas fa-reply-all"
    },
    {
        "value": "fab fa-replyd",
        "label": "fab fa-replyd"
    },
    {
        "value": "fab fa-resolving",
        "label": "fab fa-resolving"
    },
    {
        "value": "fas fa-retweet",
        "label": "fas fa-retweet"
    },
    {
        "value": "fas fa-road",
        "label": "fas fa-road"
    },
    {
        "value": "fas fa-rocket",
        "label": "fas fa-rocket"
    },
    {
        "value": "fab fa-rocketchat",
        "label": "fab fa-rocketchat"
    },
    {
        "value": "fab fa-rockrms",
        "label": "fab fa-rockrms"
    },
    {
        "value": "fas fa-rss",
        "label": "fas fa-rss"
    },
    {
        "value": "fas fa-rss-square",
        "label": "fas fa-rss-square"
    },
    {
        "value": "fas fa-ruble-sign",
        "label": "fas fa-ruble-sign"
    },
    {
        "value": "fas fa-rupee-sign",
        "label": "fas fa-rupee-sign"
    },
    {
        "value": "fab fa-safari",
        "label": "fab fa-safari"
    },
    {
        "value": "fab fa-sass",
        "label": "fab fa-sass"
    },
    {
        "value": "fas fa-save",
        "label": "fas fa-save"
    },
    {
        "value": "far fa-save",
        "label": "far fa-save"
    },
    {
        "value": "fab fa-schlix",
        "label": "fab fa-schlix"
    },
    {
        "value": "fab fa-scribd",
        "label": "fab fa-scribd"
    },
    {
        "value": "fas fa-search",
        "label": "fas fa-search"
    },
    {
        "value": "fas fa-search-minus",
        "label": "fas fa-search-minus"
    },
    {
        "value": "fas fa-search-plus",
        "label": "fas fa-search-plus"
    },
    {
        "value": "fab fa-searchengin",
        "label": "fab fa-searchengin"
    },
    {
        "value": "fab fa-sellcast",
        "label": "fab fa-sellcast"
    },
    {
        "value": "fab fa-sellsy",
        "label": "fab fa-sellsy"
    },
    {
        "value": "fas fa-server",
        "label": "fas fa-server"
    },
    {
        "value": "fab fa-servicestack",
        "label": "fab fa-servicestack"
    },
    {
        "value": "fas fa-share",
        "label": "fas fa-share"
    },
    {
        "value": "fas fa-share-alt",
        "label": "fas fa-share-alt"
    },
    {
        "value": "fas fa-share-alt-square",
        "label": "fas fa-share-alt-square"
    },
    {
        "value": "fas fa-share-square",
        "label": "fas fa-share-square"
    },
    {
        "value": "far fa-share-square",
        "label": "far fa-share-square"
    },
    {
        "value": "fas fa-shekel-sign",
        "label": "fas fa-shekel-sign"
    },
    {
        "value": "fas fa-shield-alt",
        "label": "fas fa-shield-alt"
    },
    {
        "value": "fas fa-ship",
        "label": "fas fa-ship"
    },
    {
        "value": "fab fa-shirtsinbulk",
        "label": "fab fa-shirtsinbulk"
    },
    {
        "value": "fas fa-shopping-bag",
        "label": "fas fa-shopping-bag"
    },
    {
        "value": "fas fa-shopping-basket",
        "label": "fas fa-shopping-basket"
    },
    {
        "value": "fas fa-shopping-cart",
        "label": "fas fa-shopping-cart"
    },
    {
        "value": "fas fa-shower",
        "label": "fas fa-shower"
    },
    {
        "value": "fas fa-sign-in-alt",
        "label": "fas fa-sign-in-alt"
    },
    {
        "value": "fas fa-sign-language",
        "label": "fas fa-sign-language"
    },
    {
        "value": "fas fa-sign-out-alt",
        "label": "fas fa-sign-out-alt"
    },
    {
        "value": "fas fa-signal",
        "label": "fas fa-signal"
    },
    {
        "value": "fab fa-simplybuilt",
        "label": "fab fa-simplybuilt"
    },
    {
        "value": "fab fa-sistrix",
        "label": "fab fa-sistrix"
    },
    {
        "value": "fas fa-sitemap",
        "label": "fas fa-sitemap"
    },
    {
        "value": "fab fa-skyatlas",
        "label": "fab fa-skyatlas"
    },
    {
        "value": "fab fa-skype",
        "label": "fab fa-skype"
    },
    {
        "value": "fab fa-slack",
        "label": "fab fa-slack"
    },
    {
        "value": "fab fa-slack-hash",
        "label": "fab fa-slack-hash"
    },
    {
        "value": "fas fa-sliders-h",
        "label": "fas fa-sliders-h"
    },
    {
        "value": "fab fa-slideshare",
        "label": "fab fa-slideshare"
    },
    {
        "value": "fas fa-smile",
        "label": "fas fa-smile"
    },
    {
        "value": "far fa-smile",
        "label": "far fa-smile"
    },
    {
        "value": "fab fa-snapchat",
        "label": "fab fa-snapchat"
    },
    {
        "value": "fab fa-snapchat-ghost",
        "label": "fab fa-snapchat-ghost"
    },
    {
        "value": "fab fa-snapchat-square",
        "label": "fab fa-snapchat-square"
    },
    {
        "value": "fas fa-snowflake",
        "label": "fas fa-snowflake"
    },
    {
        "value": "far fa-snowflake",
        "label": "far fa-snowflake"
    },
    {
        "value": "fas fa-sort",
        "label": "fas fa-sort"
    },
    {
        "value": "fas fa-sort-alpha-down",
        "label": "fas fa-sort-alpha-down"
    },
    {
        "value": "fas fa-sort-alpha-up",
        "label": "fas fa-sort-alpha-up"
    },
    {
        "value": "fas fa-sort-amount-down",
        "label": "fas fa-sort-amount-down"
    },
    {
        "value": "fas fa-sort-amount-up",
        "label": "fas fa-sort-amount-up"
    },
    {
        "value": "fas fa-sort-down",
        "label": "fas fa-sort-down"
    },
    {
        "value": "fas fa-sort-numeric-down",
        "label": "fas fa-sort-numeric-down"
    },
    {
        "value": "fas fa-sort-numeric-up",
        "label": "fas fa-sort-numeric-up"
    },
    {
        "value": "fas fa-sort-up",
        "label": "fas fa-sort-up"
    },
    {
        "value": "fab fa-soundcloud",
        "label": "fab fa-soundcloud"
    },
    {
        "value": "fas fa-space-shuttle",
        "label": "fas fa-space-shuttle"
    },
    {
        "value": "fab fa-speakap",
        "label": "fab fa-speakap"
    },
    {
        "value": "fas fa-spinner",
        "label": "fas fa-spinner"
    },
    {
        "value": "fab fa-spotify",
        "label": "fab fa-spotify"
    },
    {
        "value": "fas fa-square",
        "label": "fas fa-square"
    },
    {
        "value": "far fa-square",
        "label": "far fa-square"
    },
    {
        "value": "fab fa-stack-exchange",
        "label": "fab fa-stack-exchange"
    },
    {
        "value": "fab fa-stack-overflow",
        "label": "fab fa-stack-overflow"
    },
    {
        "value": "fas fa-star",
        "label": "fas fa-star"
    },
    {
        "value": "far fa-star",
        "label": "far fa-star"
    },
    {
        "value": "fas fa-star-half",
        "label": "fas fa-star-half"
    },
    {
        "value": "far fa-star-half",
        "label": "far fa-star-half"
    },
    {
        "value": "fab fa-staylinked",
        "label": "fab fa-staylinked"
    },
    {
        "value": "fab fa-steam",
        "label": "fab fa-steam"
    },
    {
        "value": "fab fa-steam-square",
        "label": "fab fa-steam-square"
    },
    {
        "value": "fab fa-steam-symbol",
        "label": "fab fa-steam-symbol"
    },
    {
        "value": "fas fa-step-backward",
        "label": "fas fa-step-backward"
    },
    {
        "value": "fas fa-step-forward",
        "label": "fas fa-step-forward"
    },
    {
        "value": "fas fa-stethoscope",
        "label": "fas fa-stethoscope"
    },
    {
        "value": "fab fa-sticker-mule",
        "label": "fab fa-sticker-mule"
    },
    {
        "value": "fas fa-sticky-note",
        "label": "fas fa-sticky-note"
    },
    {
        "value": "far fa-sticky-note",
        "label": "far fa-sticky-note"
    },
    {
        "value": "fas fa-stop",
        "label": "fas fa-stop"
    },
    {
        "value": "fas fa-stop-circle",
        "label": "fas fa-stop-circle"
    },
    {
        "value": "far fa-stop-circle",
        "label": "far fa-stop-circle"
    },
    {
        "value": "fab fa-strava",
        "label": "fab fa-strava"
    },
    {
        "value": "fas fa-street-view",
        "label": "fas fa-street-view"
    },
    {
        "value": "fas fa-strikethrough",
        "label": "fas fa-strikethrough"
    },
    {
        "value": "fab fa-stripe",
        "label": "fab fa-stripe"
    },
    {
        "value": "fab fa-stripe-s",
        "label": "fab fa-stripe-s"
    },
    {
        "value": "fab fa-studiovinari",
        "label": "fab fa-studiovinari"
    },
    {
        "value": "fab fa-stumbleupon",
        "label": "fab fa-stumbleupon"
    },
    {
        "value": "fab fa-stumbleupon-circle",
        "label": "fab fa-stumbleupon-circle"
    },
    {
        "value": "fas fa-subscript",
        "label": "fas fa-subscript"
    },
    {
        "value": "fas fa-subway",
        "label": "fas fa-subway"
    },
    {
        "value": "fas fa-suitcase",
        "label": "fas fa-suitcase"
    },
    {
        "value": "fas fa-sun",
        "label": "fas fa-sun"
    },
    {
        "value": "far fa-sun",
        "label": "far fa-sun"
    },
    {
        "value": "fab fa-superpowers",
        "label": "fab fa-superpowers"
    },
    {
        "value": "fas fa-superscript",
        "label": "fas fa-superscript"
    },
    {
        "value": "fab fa-supple",
        "label": "fab fa-supple"
    },
    {
        "value": "fas fa-sync",
        "label": "fas fa-sync"
    },
    {
        "value": "fas fa-sync-alt",
        "label": "fas fa-sync-alt"
    },
    {
        "value": "fas fa-table",
        "label": "fas fa-table"
    },
    {
        "value": "fas fa-tablet",
        "label": "fas fa-tablet"
    },
    {
        "value": "fas fa-tablet-alt",
        "label": "fas fa-tablet-alt"
    },
    {
        "value": "fas fa-tachometer-alt",
        "label": "fas fa-tachometer-alt"
    },
    {
        "value": "fas fa-tag",
        "label": "fas fa-tag"
    },
    {
        "value": "fas fa-tags",
        "label": "fas fa-tags"
    },
    {
        "value": "fas fa-tasks",
        "label": "fas fa-tasks"
    },
    {
        "value": "fas fa-taxi",
        "label": "fas fa-taxi"
    },
    {
        "value": "fab fa-telegram",
        "label": "fab fa-telegram"
    },
    {
        "value": "fab fa-telegram-plane",
        "label": "fab fa-telegram-plane"
    },
    {
        "value": "fab fa-tencent-weibo",
        "label": "fab fa-tencent-weibo"
    },
    {
        "value": "fas fa-terminal",
        "label": "fas fa-terminal"
    },
    {
        "value": "fas fa-text-height",
        "label": "fas fa-text-height"
    },
    {
        "value": "fas fa-text-width",
        "label": "fas fa-text-width"
    },
    {
        "value": "fas fa-th",
        "label": "fas fa-th"
    },
    {
        "value": "fas fa-th-large",
        "label": "fas fa-th-large"
    },
    {
        "value": "fas fa-th-list",
        "label": "fas fa-th-list"
    },
    {
        "value": "fab fa-themeisle",
        "label": "fab fa-themeisle"
    },
    {
        "value": "fas fa-thermometer-empty",
        "label": "fas fa-thermometer-empty"
    },
    {
        "value": "fas fa-thermometer-full",
        "label": "fas fa-thermometer-full"
    },
    {
        "value": "fas fa-thermometer-half",
        "label": "fas fa-thermometer-half"
    },
    {
        "value": "fas fa-thermometer-quarter",
        "label": "fas fa-thermometer-quarter"
    },
    {
        "value": "fas fa-thermometer-three-quarters",
        "label": "fas fa-thermometer-three-quarters"
    },
    {
        "value": "fas fa-thumbs-down",
        "label": "fas fa-thumbs-down"
    },
    {
        "value": "far fa-thumbs-down",
        "label": "far fa-thumbs-down"
    },
    {
        "value": "fas fa-thumbs-up",
        "label": "fas fa-thumbs-up"
    },
    {
        "value": "far fa-thumbs-up",
        "label": "far fa-thumbs-up"
    },
    {
        "value": "fas fa-thumbtack",
        "label": "fas fa-thumbtack"
    },
    {
        "value": "fas fa-ticket-alt",
        "label": "fas fa-ticket-alt"
    },
    {
        "value": "fas fa-times",
        "label": "fas fa-times"
    },
    {
        "value": "fas fa-times-circle",
        "label": "fas fa-times-circle"
    },
    {
        "value": "far fa-times-circle",
        "label": "far fa-times-circle"
    },
    {
        "value": "fas fa-tint",
        "label": "fas fa-tint"
    },
    {
        "value": "fas fa-toggle-off",
        "label": "fas fa-toggle-off"
    },
    {
        "value": "fas fa-toggle-on",
        "label": "fas fa-toggle-on"
    },
    {
        "value": "fas fa-trademark",
        "label": "fas fa-trademark"
    },
    {
        "value": "fas fa-train",
        "label": "fas fa-train"
    },
    {
        "value": "fas fa-transgender",
        "label": "fas fa-transgender"
    },
    {
        "value": "fas fa-transgender-alt",
        "label": "fas fa-transgender-alt"
    },
    {
        "value": "fas fa-trash",
        "label": "fas fa-trash"
    },
    {
        "value": "fas fa-trash-alt",
        "label": "fas fa-trash-alt"
    },
    {
        "value": "far fa-trash-alt",
        "label": "far fa-trash-alt"
    },
    {
        "value": "fas fa-tree",
        "label": "fas fa-tree"
    },
    {
        "value": "fab fa-trello",
        "label": "fab fa-trello"
    },
    {
        "value": "fab fa-tripadvisor",
        "label": "fab fa-tripadvisor"
    },
    {
        "value": "fas fa-trophy",
        "label": "fas fa-trophy"
    },
    {
        "value": "fas fa-truck",
        "label": "fas fa-truck"
    },
    {
        "value": "fas fa-tty",
        "label": "fas fa-tty"
    },
    {
        "value": "fab fa-tumblr",
        "label": "fab fa-tumblr"
    },
    {
        "value": "fab fa-tumblr-square",
        "label": "fab fa-tumblr-square"
    },
    {
        "value": "fas fa-tv",
        "label": "fas fa-tv"
    },
    {
        "value": "fab fa-twitch",
        "label": "fab fa-twitch"
    },
    {
        "value": "fab fa-twitter",
        "label": "fab fa-twitter"
    },
    {
        "value": "fab fa-twitter-square",
        "label": "fab fa-twitter-square"
    },
    {
        "value": "fab fa-typo3",
        "label": "fab fa-typo3"
    },
    {
        "value": "fab fa-uber",
        "label": "fab fa-uber"
    },
    {
        "value": "fab fa-uikit",
        "label": "fab fa-uikit"
    },
    {
        "value": "fas fa-umbrella",
        "label": "fas fa-umbrella"
    },
    {
        "value": "fas fa-underline",
        "label": "fas fa-underline"
    },
    {
        "value": "fas fa-undo",
        "label": "fas fa-undo"
    },
    {
        "value": "fas fa-undo-alt",
        "label": "fas fa-undo-alt"
    },
    {
        "value": "fab fa-uniregistry",
        "label": "fab fa-uniregistry"
    },
    {
        "value": "fas fa-universal-access",
        "label": "fas fa-universal-access"
    },
    {
        "value": "fas fa-university",
        "label": "fas fa-university"
    },
    {
        "value": "fas fa-unlink",
        "label": "fas fa-unlink"
    },
    {
        "value": "fas fa-unlock",
        "label": "fas fa-unlock"
    },
    {
        "value": "fas fa-unlock-alt",
        "label": "fas fa-unlock-alt"
    },
    {
        "value": "fab fa-untappd",
        "label": "fab fa-untappd"
    },
    {
        "value": "fas fa-upload",
        "label": "fas fa-upload"
    },
    {
        "value": "fab fa-usb",
        "label": "fab fa-usb"
    },
    {
        "value": "fas fa-user",
        "label": "fas fa-user"
    },
    {
        "value": "far fa-user",
        "label": "far fa-user"
    },
    {
        "value": "fas fa-user-circle",
        "label": "fas fa-user-circle"
    },
    {
        "value": "far fa-user-circle",
        "label": "far fa-user-circle"
    },
    {
        "value": "fas fa-user-md",
        "label": "fas fa-user-md"
    },
    {
        "value": "fas fa-user-plus",
        "label": "fas fa-user-plus"
    },
    {
        "value": "fas fa-user-secret",
        "label": "fas fa-user-secret"
    },
    {
        "value": "fas fa-user-times",
        "label": "fas fa-user-times"
    },
    {
        "value": "fas fa-users",
        "label": "fas fa-users"
    },
    {
        "value": "fab fa-ussunnah",
        "label": "fab fa-ussunnah"
    },
    {
        "value": "fas fa-utensil-spoon",
        "label": "fas fa-utensil-spoon"
    },
    {
        "value": "fas fa-utensils",
        "label": "fas fa-utensils"
    },
    {
        "value": "fab fa-vaadin",
        "label": "fab fa-vaadin"
    },
    {
        "value": "fas fa-venus",
        "label": "fas fa-venus"
    },
    {
        "value": "fas fa-venus-double",
        "label": "fas fa-venus-double"
    },
    {
        "value": "fas fa-venus-mars",
        "label": "fas fa-venus-mars"
    },
    {
        "value": "fab fa-viacoin",
        "label": "fab fa-viacoin"
    },
    {
        "value": "fab fa-viadeo",
        "label": "fab fa-viadeo"
    },
    {
        "value": "fab fa-viadeo-square",
        "label": "fab fa-viadeo-square"
    },
    {
        "value": "fab fa-viber",
        "label": "fab fa-viber"
    },
    {
        "value": "fas fa-video",
        "label": "fas fa-video"
    },
    {
        "value": "fab fa-vimeo",
        "label": "fab fa-vimeo"
    },
    {
        "value": "fab fa-vimeo-square",
        "label": "fab fa-vimeo-square"
    },
    {
        "value": "fab fa-vimeo-v",
        "label": "fab fa-vimeo-v"
    },
    {
        "value": "fab fa-vine",
        "label": "fab fa-vine"
    },
    {
        "value": "fab fa-vk",
        "label": "fab fa-vk"
    },
    {
        "value": "fab fa-vnv",
        "label": "fab fa-vnv"
    },
    {
        "value": "fas fa-volume-down",
        "label": "fas fa-volume-down"
    },
    {
        "value": "fas fa-volume-off",
        "label": "fas fa-volume-off"
    },
    {
        "value": "fas fa-volume-up",
        "label": "fas fa-volume-up"
    },
    {
        "value": "fab fa-vuejs",
        "label": "fab fa-vuejs"
    },
    {
        "value": "fab fa-weibo",
        "label": "fab fa-weibo"
    },
    {
        "value": "fab fa-weixin",
        "label": "fab fa-weixin"
    },
    {
        "value": "fab fa-whatsapp",
        "label": "fab fa-whatsapp"
    },
    {
        "value": "fab fa-whatsapp-square",
        "label": "fab fa-whatsapp-square"
    },
    {
        "value": "fas fa-wheelchair",
        "label": "fas fa-wheelchair"
    },
    {
        "value": "fab fa-whmcs",
        "label": "fab fa-whmcs"
    },
    {
        "value": "fas fa-wifi",
        "label": "fas fa-wifi"
    },
    {
        "value": "fab fa-wikipedia-w",
        "label": "fab fa-wikipedia-w"
    },
    {
        "value": "fas fa-window-close",
        "label": "fas fa-window-close"
    },
    {
        "value": "far fa-window-close",
        "label": "far fa-window-close"
    },
    {
        "value": "fas fa-window-maximize",
        "label": "fas fa-window-maximize"
    },
    {
        "value": "far fa-window-maximize",
        "label": "far fa-window-maximize"
    },
    {
        "value": "fas fa-window-minimize",
        "label": "fas fa-window-minimize"
    },
    {
        "value": "fas fa-window-restore",
        "label": "fas fa-window-restore"
    },
    {
        "value": "far fa-window-restore",
        "label": "far fa-window-restore"
    },
    {
        "value": "fab fa-windows",
        "label": "fab fa-windows"
    },
    {
        "value": "fas fa-won-sign",
        "label": "fas fa-won-sign"
    },
    {
        "value": "fab fa-wordpress",
        "label": "fab fa-wordpress"
    },
    {
        "value": "fab fa-wordpress-simple",
        "label": "fab fa-wordpress-simple"
    },
    {
        "value": "fab fa-wpbeginner",
        "label": "fab fa-wpbeginner"
    },
    {
        "value": "fab fa-wpexplorer",
        "label": "fab fa-wpexplorer"
    },
    {
        "value": "fab fa-wpforms",
        "label": "fab fa-wpforms"
    },
    {
        "value": "fas fa-wrench",
        "label": "fas fa-wrench"
    },
    {
        "value": "fab fa-xbox",
        "label": "fab fa-xbox"
    },
    {
        "value": "fab fa-xing",
        "label": "fab fa-xing"
    },
    {
        "value": "fab fa-xing-square",
        "label": "fab fa-xing-square"
    },
    {
        "value": "fab fa-y-combinator",
        "label": "fab fa-y-combinator"
    },
    {
        "value": "fab fa-yahoo",
        "label": "fab fa-yahoo"
    },
    {
        "value": "fab fa-yandex",
        "label": "fab fa-yandex"
    },
    {
        "value": "fab fa-yandex-international",
        "label": "fab fa-yandex-international"
    },
    {
        "value": "fab fa-yelp",
        "label": "fab fa-yelp"
    },
    {
        "value": "fas fa-yen-sign",
        "label": "fas fa-yen-sign"
    },
    {
        "value": "fab fa-yoast",
        "label": "fab fa-yoast"
    },
    {
        "value": "fab fa-youtube",
        "label": "fab fa-youtube"
    }
]

const CHOICE = {
  options: [
    {
      name: "",
    },
    {
      name: "",
    },
  ],
  min: 0,
  max: 0,
};

const ALLOCATION = {
  options: [
    {
      name: "",
    },
    {
      name: "",
    },
  ],
  total: "",
  min: "",
  max: "",
  step: "",
};

export const CONCLUSION_DATA = {
  title: "",
  icon: null,
  text1: "",
  text2: "",
};

const FORM_TYPE = {
  CHOICE: "choice",
  ALLOCATION: "allocation",
};
export const CustomOption = ({ data }) => {
  //TODO: bring label from translation for aria label
  return (
    <div className={`dropDownIconsContainer`} onClick={console.log("CLICKED")}>
      <Icon className={`${data.value} dropDownIcon`} />
      <span>{data.label}</span>{" "}
    </div>
  );
};
export default class SubjectBase extends Component {
  handleOptionChange = (e, newValue, type) => {
    this.setState({
      [type]: newValue,
    });
  };

  handleAccounts = async (value) => {
    try {
      let response = await getAccounts(
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      this.setState({
        accountsData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleCategories = async (value) => {
    try {
      let response = await fetchCategoryByAccountId(
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      this.setState({
        categoryData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleUsers = async (value) => {
    try {
      let response = await getUsersByAccountId(
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      debugger
      this.setState({
        adminsData: response.data.items,
        adminValue: value
      });
      
    } catch (e) {
      renderFailureNotification("Data not fetched");
      console.error(e);
    }
  };

  handleExpertUsers = async (value) => {
    try {
      let response = await getUsersByAccountId(
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      this.setState({
        expertAdminsData: response.data.items,
        expertValue: value
      });
      
    } catch (e) {
      renderFailureNotification("Data not fetched");
      console.error(e);
    }
  };

  handleGroups = async (value) => {
    try {
      let response = await searchGroupByAccountId(
        "",
        this.state.account.id,
        PAGE_LIMIT,
        this.state.currentPage
      );

      this.setState({
        groupsData: response.data.items,
      });
    } catch (e) {
      renderFailureNotification("Groups not fetched");
      console.error(e);
    }
  };

  handleChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  onChangeDate = (date, type) => {
    this.setState({
      [type]: date,
    });
  };

  handleCheckboxChange = (type, newValue) => {
    this.setState({
      [type]: newValue,
    });
  };

  onUploadComplete = (response, type) => {
    if (!this.state[type]) {
      let files = [];
      files.push(response.data);
      this.setState({
        [type]: files,
      });
    } else {
      let fileCopy = Object.assign([], this.state[type]);
      fileCopy.push(response.data);
      this.setState({
        [type]: fileCopy,
      });
    }
  };

  onUploadBackgroundComplete = (response) => {
    let uploadedURL = response.data && response.data.original;
    let cover = {
      original: uploadedURL && uploadedURL,
      sizes: {
        "720x1080": uploadedURL && uploadedURL,
      },
    };
    this.setState({
      cover: cover,
    });
  };

  getFormType = (type) => {
    let data = FORM_TYPE_DATA.filter((singleElement) => {
      return singleElement.value === type;
    });
    return data[0];
  };

  getStatusType = (status) => {
    let data = STATUS_DATA.filter((singleElement) => {
      return singleElement.value === status;
    });
    return data[0];
  };

  onChangeOptionsTextField = (e, index, type) => {
    let dataCopy = Object.assign({}, this.state[type]);
    dataCopy.options[index].name = e.target.value;
    this.setState({
      [type]: dataCopy,
    });
  };

  getDropdownValue = (icon) => {
    let iconOption = {
      value: icon,
      label: (
        <div>
          <Icon className={`${icon} dropDownIcon`}></Icon>
          <span>{icon}</span>{" "}
        </div>
      ),
    };
    return iconOption;
  };

  onChangeIconDropdown = (selectedOption, index, type) => {
    let dataCopy = Object.assign({}, this.state[type]);
    dataCopy.options[index].icon = selectedOption.value;
    this.setState({
      [type]: dataCopy,
    });
  };

  onChangeChoiceAndAllocationTextfields = (e, field, type) => {
    let dataCopy = Object.assign({}, this.state[type]);
    dataCopy[field] = +e.target.value;
    this.setState({
      [type]: dataCopy,
    });
  };

  addOption = (type) => {
    let dataCopy = Object.assign({}, this.state[type]);
    let newData = {
      name: "",
    };
    dataCopy.options.push(newData);
    this.setState({
      [type]: dataCopy,
    });
  };

  onClickDeleteOptions = (index, type) => {
    if (index > 0) {
      let dataCopy = Object.assign({}, this.state[type]);
      dataCopy.options.splice(index, 1);
      this.setState({
        [type]: dataCopy,
      });
    }
  };
  handleAddChip = (chip) => {
    var labels = Object.assign([], this.state.tags);
    for (var label in labels) {
      if (label === chip) {
        window.NotificationUtils.showError("Name already exists!");
        return;
      }
    }
    labels.push(chip);
    this.setState({
      tags: labels,
    });
  };

  handleDeleteChip = (chip, i) => {
    var labels = Object.assign([], this.state.tags);
    var filtered = labels.filter(function (value, index) {
      return index !== i;
    });
    this.setState({
      tags: filtered,
    });
  };

  renderMultiChoiceFields = () => {
    return (
      <React.Fragment>
        {this.state.choice.options.map((item, index) => {
          return (
            <div className='displayFlex'>
              <TextField
                id={`Title ${index}`}
                label={`Title`}
                className='textTransform flex1'
                style={{ margin: 8 }}
                placeholder={`Title`}
                value={item.name}
                fullWidth
                variant='outlined'
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  this.onChangeOptionsTextField(e, index, FORM_TYPE.CHOICE)
                }
              />

              <ArenaDropdown
                options={IMAGE_DROPDOWN}
                selectedOption={this.getDropdownValue(
                  this.state.choice.options[index].icon
                )}
                onChange={(selectedOption) => {
                  this.onChangeIconDropdown(
                    selectedOption,
                    index,
                    FORM_TYPE.CHOICE
                  );
                }}
                placeholder={"Icon"}
              />

              {index > 1 && (
                <Button
                  color='primary'
                  className='mgLeft8'
                  onClick={() =>
                    this.onClickDeleteOptions(index, FORM_TYPE.CHOICE)
                  }>
                  Delete
                </Button>
              )}
            </div>
          );
        })}

        {this.renderMultiChoiceConstantFields()}
      </React.Fragment>
    );
  };

  renderMultiChoiceConstantFields = () => {
    return (
      <>
        <Button
          onClick={() => this.addOption(FORM_TYPE.CHOICE)}
          id='addChoiceOption'
          fullWidth={true}
          className='margin8'
          color='primary'
          variant='contained'>
          Add Option
        </Button>
        <div className='displayFlex mgTop8'>
          <TextField
            id='minimum'
            label='Minimum'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Minimum'
            value={this.state.choice.min}
            fullWidth
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "min",
                FORM_TYPE.CHOICE
              )
            }
            error={this.state.checkErrors && this.errorInMultiChoiceMin()}
          />
          <TextField
            id='maximum'
            label='Maximum'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Maximum'
            value={this.state.choice.max}
            fullWidth
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "max",
                FORM_TYPE.CHOICE
              )
            }
            error={this.state.checkErrors && this.errorInMultiChoiceMax()}
          />
        </div>
      </>
    );
  };

  renderAllocationFields = () => {
    return (
      <React.Fragment>
        {this.state.allocation.options.map((item, index) => {
          return (
            <div className='displayFlex margin8 fullWidth'>
              <TextField
                id={`Title ${index}`}
                label={`Title`}
                className='textTransform flex1 fullWidth noMargin'
                placeholder={`Title`}
                value={item.name}
                fullWidth
                variant='outlined'
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  this.onChangeOptionsTextField(e, index, FORM_TYPE.ALLOCATION)
                }
              />
              {index > 1 && (
                <Button
                  color='primary'
                  className='mgLeft8'
                  onClick={() =>
                    this.onClickDeleteOptions(index, FORM_TYPE.ALLOCATION)
                  }>
                  Delete
                </Button>
              )}
            </div>
          );
        })}
        <Button
          onClick={() => this.addOption(FORM_TYPE.ALLOCATION)}
          id='addChoiceOption'
          fullWidth={true}
          className='margin8'
          color='primary'
          variant='contained'>
          Add Option
        </Button>

        <div className='displayFlex mgTop8'>
          <TextField
            id='step'
            label='Step'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Step'
            value={this.state.allocation.step}
            fullWidth
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "step",
                FORM_TYPE.ALLOCATION
              )
            }
            error={this.state.checkErrors && this.errorInAllocationStep()}
          />

          <TextField
            id='total'
            label='Total'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Total'
            value={this.state.allocation.total}
            fullWidth
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "total",
                FORM_TYPE.ALLOCATION
              )
            }
            error={this.state.checkErrors && this.errorInAllocationTotal()}
          />

          <TextField
            id='min'
            label='Min'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Min'
            value={this.state.allocation.min}
            fullWidth
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "min",
                FORM_TYPE.ALLOCATION
              )
            }
            error={this.state.checkErrors && this.errorInAllocationMin()}
          />

          <TextField
            id='max'
            label='Max'
            className='textTransform'
            style={{ margin: 8 }}
            placeholder='Max'
            value={this.state.allocation.max}
            fullWidth
            variant='outlined'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              this.onChangeChoiceAndAllocationTextfields(
                e,
                "max",
                FORM_TYPE.ALLOCATION
              )
            }
            error={this.state.checkErrors && this.errorInAllocationMax()}
          />
        </div>
      </React.Fragment>
    );
  };

  changeFields = (value) => {
    if (value === FORM_TYPE_MAP.choice) {
      this.setState({
        choice: CHOICE,
      });
    } else if (value === FORM_TYPE_MAP.allocation) {
      this.setState({
        allocation: ALLOCATION,
      });
    }
  };

  renderAccountDropdown = () => {
    return (
      <Autocomplete
        id='account'
        options={this.state.accountsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "account")
        }
        filterOptions={(option, state) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Accounts'
            onChange={(e) => this.handleAccounts(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInAccounts()}
          />
        )}
        value={this.state.account}
        disabled={this.state.editSubject}
      />
    );
  };

  renderCategoryDropdown = () => {
    return (
      <Autocomplete
        id='category'
        options={this.state.categoryData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "category")
        }
        filterOptions={(option, state) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Categories'
            onChange={(e) => this.handleCategories(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInCategory()}
          />
        )}
        value={this.state.category}
        disabled={!this.state.account}
      />
    );
  };

  renderTypeDropdown = () => {
    return (
      <Autocomplete
        id='type'
        options={FORM_TYPE_DATA}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          this.handleOptionChange(event, newValue, "type");
          this.changeFields(newValue?.value);
        }}
        filterOptions={(option, state) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Type'
            //   onChange={(e) => this.handleAccounts(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInType()}
          />
        )}
        value={this.state.type}
        disabled={this.state.editSubject}
      />
    );
  };

  renderStatusDropdown = () => {
    return (
      <Autocomplete
        id='status'
        options={STATUS_DATA}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "status")
        }
        filterOptions={(option, state) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Status'
            //   onChange={(e) => this.handleAccounts(e.target.value)}
            variant='outlined'
            error={this.state.checkErrors && this.errorInStatus()}
          />
        )}
        value={this.state.status}
      />
    );
  };

  renderDatePicker = () => {
    return (
      <>
        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            Start Date
          </Typography>
          <ArenaDatePicker
            id='startDropDownContainer'
            value={this.state.startDate}
            onChange={(date) => {
              this.onChangeDate(date, "startDate");
            }}
          />
        </div>
        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            End Date
          </Typography>
          <ArenaDatePicker
            id='startDropDownContainer'
            value={this.state.endDate}
            onChange={(date) => {
              this.onChangeDate(date, "endDate");
            }}
            minDate={this.state.startDate}
          />
        </div>
      </>
    );
  };

  renderUploadedImages = (files, key) => {
    if (!files || files.length < 1) {
      return;
    }
    return files.map((item) => {
      return this.renderImage(item, files, key);
    });
  };

  onClickDeleteAttachments = (file, files, key) => {
    let index = files.indexOf(file);
    if (index === -1) {
      return;
    }
    files.splice(index, 1);
    if (key === "conclusionFiles") {
      this.setState({
        conclusionFiles: files,
      });
    } else {
      this.setState({
        files,
      });
    }
  };

  renderImage = (file, files, key) => {
    return (
      <div id='imageUploaderContainer' className='uploadedImageContainer'>
        <div id='imageContainer'>
          <ArenaUploader fileURL={file.url} />
        </div>
        <Typography
          variant='body2'
          id='imageUploaderName'
          className='marginLeft8 dullWhite bold textAlignEnd'>
          {file.name}
        </Typography>
        <Button
          color='primary'
          variant='contained'
          onClick={() => this.onClickDeleteAttachments(file, files, key)}>
          Delete
        </Button>
      </div>
    );
  };

  renderBasicSubjectInfo = () => {
    return (
      <>
        <TextField
          id='name'
          label='Name'
          className='textTransform'
          style={{ margin: 8 }}
          placeholder='Name'
          value={this.state.name}
          fullWidth
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => this.handleChange("name", e.target.value)}
          error={this.state.checkErrors && this.errorInName()}
        />

        <TextField
          id='question'
          label='Question'
          className='textTransform'
          style={{ margin: 8 }}
          placeholder='Question'
          value={this.state.question}
          fullWidth
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => this.handleChange("question", e.target.value)}
          error={this.state.checkErrors && this.errorInQuestion()}
        />

        <TextField
          id='description'
          label='Description'
          className='textTransform'
          style={{ margin: 8 }}
          placeholder='Description'
          value={this.state.description}
          fullWidth
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => this.handleChange("description", e.target.value)}
          multiline
          rows={4}
          error={this.state.checkErrors && this.errorInDescription()}
        />
        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            Attachments
          </Typography>

          <ArenaUploader
            isMultiple={true}
            docUploader={true}
            fileURL={this.state.iconURL && this.state.iconURL}
            extensions={["jpg", "jpeg", "png"]}
            onUploadComplete={(response) => {
              this.onUploadComplete(response, "files");
            }}
          />
        </div>
        {this.state.files?.length > 0 &&
          this.renderUploadedImages(this.state.files)}

        <div className='margin8 fullWidth'>
          <Typography variant='body2' className='mgTop12'>
            Background Image
          </Typography>

          <ArenaUploader
            isMultiple={true}
            fileURL={this.state.cover && this.state.cover.original}
            extensions={["jpg", "jpeg", "png"]}
            onUploadComplete={(response) => {
              this.onUploadBackgroundComplete(response, "backgroundCover");
            }}
          />
        </div>
      </>
    );
  };

  renderGroupsDropdown = () => {
    return (
      <Autocomplete
        multiple
        id='groups'
        options={this.state.groupsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "groups")
        }
        filterOptions={(option, state) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Groups'
            onChange={(e) => this.handleGroups(e.target.value)}
            variant='outlined'
          />
        )}
        value={this.state.groups}
        disabled={!this.state.account}
      />
    );
  };

  renderExpertsDropdown = () => {
    return (
      <Autocomplete
        multiple
        id='experts'
        options={this.state.expertAdminsData}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "experts")
        }
        filterOptions={(option, state) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Experts'
            value={this.state.expertValue}
            onChange={(e) => this.handleExpertUsers(e.target.value)}
            variant='outlined'
          />
        )}
        value={this.state.experts}
        disabled={!this.state.account}
      />
    );
  };

  renderAdminsDropdown = () => {
    return (
      <Autocomplete
        multiple
        id='admins'
        options={this.state.adminsData}
        getOptionLabel={(option) => option.name}
        filterOptions={(option, state) => option}
        onChange={(event, newValue) =>
          this.handleOptionChange(event, newValue, "subjectAdmins")
        }
        filterOptions={(option, state) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ margin: 8 }}
            label='Admins'
            value={this.state.adminValue}
            onChange={(e) => this.handleUsers(e.target.value)}
            variant='outlined'
          />
        )}
        value={this.state.subjectAdmins}
        disabled={!this.state.account}
      />
    );
  };
  renderChipInput = () => {
    return (
      <div className='chipInputContainer'>
        <ChipInput
          variant='outlined'
          className='chipInput'
          disableUnderline={true}
          id='addLabels'
          placeholder='Press `Enter` to add labels'
          value={this.state.tags}
          onAdd={(chip) => this.handleAddChip(chip)}
          onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
        />
      </div>
    );
  };

  renderCheckboxes = () => {
    return (
      <>
        <div className='checkBoxContainer margin8 fullWidth'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.private}
                onChange={(e) =>
                  this.handleCheckboxChange("private", e.target.checked)
                }
                name='checkedB'
                color='primary'
              />
            }
            label={"Private"}
          />
        </div>

        <div className='checkBoxContainer margin8 fullWidth'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showReport}
                onChange={(e) =>
                  this.handleCheckboxChange("showReport", e.target.checked)
                }
                name='checkedB'
                color='primary'
              />
            }
            label={"Show Immediate Report"}
          />
        </div>
      </>
    );
  };

  addConclusion = () => {
    let conclusionData = Object.assign([], this.state.conclusion);
    let data = {
      title: "",
      icon: null,
      text1: "",
      text2: "",
    };
    conclusionData.push(data);

    this.setState({
      conclusion: conclusionData,
    });
  };

  addConclusionButton = () => {
    return (
      <Button
        onClick={() => this.addConclusion()}
        id='addConclusion'
        fullWidth={true}
        className='mgTop8'
        color='primary'
        variant='contained'>
        Add Conclusion
      </Button>
    );
  };

  renderConclusionFields = () => {
    return (
      <>
        <div className='checkBoxContainer margin8 fullWidth'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showConclusion}
                onChange={(e) =>
                  this.handleCheckboxChange("showConclusion", e.target.checked)
                }
                name='checkedB'
                color='primary'
              />
            }
            label={"Conclusion"}
          />
        </div>
        {this.state.showConclusion && this.renderConclusion()}
        {this.state.showConclusion && this.addConclusionButton()}
      </>
    );
  };

  onChangeConclusionTextfields = (e, index, type) => {
    let conclusionCopy = Object.assign([], this.state.conclusion);
    conclusionCopy[index][type] = e.target.value;

    this.setState({
      conclusion: conclusionCopy,
    });
  };

  onChangeConclusionDropdown = (selectedOption, index, type) => {
    let conclusioCopy = Object.assign([], this.state.conclusion);
    conclusioCopy[index].icon = selectedOption.value;

    this.setState({
      conclusion: conclusioCopy,
    });
  };

  onClickDeleteConclusion = (index) => {
    let conclusionCopy = Object.assign([], this.state.conclusion);
    conclusionCopy.splice(index, 1);

    this.setState({
      conclusion: conclusionCopy,
    });
  };

  renderConclusion = () => {
    return this.state.conclusion.map((singleConclusion, index) => {
      return (
        <>
          <ConclusionComponent
            conclusionData={singleConclusion}
            index={index}
            onChangeConclusionTextfields={this.onChangeConclusionTextfields}
            getDropdownValue={this.getDropdownValue}
            onChangeConclusionDropdown={this.onChangeConclusionDropdown}
            onUploadComplete={this.onUploadComplete}
            length={this.state.conclusion?.length}
            onClickDeleteConclusion={this.onClickDeleteConclusion}
            renderUploadedImages={this.renderUploadedImages}
            conclusionFiles={this.state.conclusionFiles}
          />
        </>
      );
    });
  };

  closeCommentModal = () => {
    this.setState({
      openCommentModal: false,
    });
  };
  renderCommentModal = () => {
    return (
      <CommentsModal
        subjectId={this.state.subjectId}
        closeCommentModal={this.closeCommentModal}
        openCommentModal={this.state.openCommentModal}
      />
    );
  };

  onClickViewComments = () => {
    this.setState({
      openCommentModal: true,
    });
  };

  renderViewCommentButton = () => {
    return (
      <Button
        color='primary'
        variant='contained'
        className='margin8'
        onClick={this.onClickViewComments}>
        View Comments
      </Button>
    );
  };

  renderMainContent() {
    return (
      <div>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: "20px" }}>
              <form autoComplete='off'>
                {this.renderAccountDropdown()}

                {this.renderCategoryDropdown()}

                {this.renderTypeDropdown()}

                {this.state.type?.value === FORM_TYPE_MAP.discussion &&
                  this.state.subjectId &&
                  this.renderViewCommentButton()}

                {this.state.type?.value === FORM_TYPE_MAP.choice &&
                  this.renderMultiChoiceFields()}
                {this.state.type?.value === FORM_TYPE_MAP.allocation &&
                  this.renderAllocationFields()}

                {this.renderStatusDropdown()}
                {this.renderDatePicker()}

                {this.renderBasicSubjectInfo()}

                {this.renderConclusionFields()}

                {this.renderCheckboxes()}
                {this.renderGroupsDropdown()}

                {this.renderExpertsDropdown()}
                {this.renderAdminsDropdown()}
                {this.renderChipInput()}

                {this.state.openCommentModal && this.renderCommentModal()}

                <Button
                  variant='contained'
                  style={{ margin: 8 }}
                  color='primary'
                  onClick={() => this.handleSave()}>
                  Save
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  errorInAccounts = () => {
    return !this.state.account;
  };

  errorInCategory = () => {
    return !this.state.category;
  };

  errorInType = () => {
    return !this.state.type;
  };

  errorInStatus = () => {
    return !this.state.status;
  };

  errorInName = () => {
    return !this.state.name;
  };

  errorInDescription = () => {
    return !this.state.description;
  };

  errorInQuestion = () => {
    return !this.state.question;
  };

  errorInAllocationTotal = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.total
    );
  };

  errorInAllocationMin = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.min
    );
  };

  errorInAllocationMax = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.max
    );
  };

  errorInAllocationStep = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.allocation &&
      !this.state.allocation.step
    );
  };

  errorInMultiChoiceMin = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.choice && !this.state.choice.min
    );
  };

  errorInMultiChoiceMax = () => {
    return (
      this.state.type?.value === FORM_TYPE_MAP.choice && !this.state.choice.max
    );
  };

  checkErrors() {
    if (!this.state.account) {
      renderFailureNotification("Account not selected");
      return true;
    }
    if (!this.state.category) {
      renderFailureNotification("Category not selected");
      return true;
    }
    if (!this.state.type) {
      renderFailureNotification("Type not selected");
      return true;
    }
    if (!this.state.status) {
      renderFailureNotification("Status not selected");
      return true;
    }
    if (!this.state.name) {
      renderFailureNotification("Name not present");
      return true;
    }
    if (!this.state.description) {
      renderFailureNotification("Description not present");
      return true;
    }
    if (!this.state.question) {
      renderFailureNotification("Question not present");
      return true;
    }
    if (this.state.type?.value === FORM_TYPE_MAP.allocation) {
      let allocation = this.state.allocation;

      for (let item of this.state.allocation.options) {
        if (!item.name || !item.icon) {
          renderFailureNotification("Enter Allocation Fields");
          return true;
        }
      }
      if (!allocation.total) {
        renderFailureNotification("Enter Allocation Total");
        return true;
      }
      if (!allocation.min) {
        renderFailureNotification("Enter Allocation minimum value");
        return true;
      }
      if (!allocation.max) {
        renderFailureNotification("Enter Allocation maximum value");
        return true;
      }
      if (!allocation.step) {
        renderFailureNotification("Enter Allocation step value");
        return true;
      }
    }

    if (this.state.type?.value === FORM_TYPE_MAP.choice) {
      let choice = this.state.choice;

      for (let item of this.state.choice.options) {
        if (!item.name || !item.icon) {
          renderFailureNotification("Enter Multi-choice Fields");
          return true;
        }
      }
      if (!choice.min) {
        renderFailureNotification("Enter Multi-choice Minimum value");
        return true;
      }
      if (!choice.max) {
        renderFailureNotification("Enter Multi-choice Maximum value");
        return true;
      }
    }

    if (this.state.startDate > this.state.endDate) {
      renderFailureNotification("Start date cannot be greater than end date");
      return true;
    }

    return false;
  }
}
