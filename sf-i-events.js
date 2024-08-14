/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query, queryAssignedElements, property } from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
import { Chart, registerables } from 'chart.js';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
/*

Modes: View, Add, Edit, Delete, Admin
DB: partitionKey, rangeKey, values

*/
/**
 * SfIEvents element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
let SfIEvents = class SfIEvents extends LitElement {
    constructor() {
        super();
        this.SEARCH_BLOCK_SIZE = 10;
        this.FLOW_GRAPH_COMPLETENESS = "completeness";
        this.FLOW_GRAPH_TIMELINESS = "timeliness";
        this.FLOW_GRAPH_COMPLIANCE = "compliance";
        this.FLOW_GRAPH_RISKAREAS = "riskarea";
        this.FLOW_GRAPH_RISKSEVERITY = "risk";
        this.FLOW_GRAPH_LOCATION = "locationname";
        this.FLOW_GRAPH_FUNCTION = "functions";
        this.FLOW_GRAPH_OBLIGATIONTYPE = "obligationtype";
        this.FLOW_GRAPH_JURISDICTION = "jurisdiction";
        this.FLOW_GRAPH_FREQUENCY = "frequency";
        this.FLOW_GRAPH_SUBCATEGORY = "subcategory";
        this.TAB_GROUP_BUSINESS_UNDERSTANDING = "businessunderstanding";
        this.TAB_GROUP_GOVERNANCE_MAPPING = "governancemapping";
        this.TAB_GROUP_CUSTOMIZATION = "customize";
        this.TAB_GROUP_ROLLOUT = "rollout";
        this.TAB_YEAR = "year";
        this.TAB_FIND = "find";
        this.TAB_STREAM = "stream";
        this.TAB_UPCOMING = "upcoming";
        this.TAB_THIS = "this";
        this.TAB_PAST = "past";
        this.TAB_CUSTOM = "custom";
        this.TAB_ADHOC = "adhoc";
        this.TAB_REGISTERS = "registers";
        this.TAB_REPORTER = "reporter";
        this.TAB_APPROVER = "approver";
        this.TAB_FUNCTION_HEAD = "functionhead";
        this.TAB_AUDITOR = "auditor";
        this.TAB_VIEWER = "viewer";
        this.TAB_STATUTES = "statutes";
        this.TAB_COMPLIANCES = "compliances";
        this.TAB_ENTITIES = "entities";
        this.TAB_LOCATIONS = "locations";
        this.TAB_TAGS = "tags";
        this.TAB_REPORTERS = "reporters";
        this.TAB_APPROVERS = "approvers";
        this.TAB_FUNCTION_HEADS = "functionheads";
        this.TAB_MAKER_CHECKERS = "makercheckers";
        this.TAB_AUDITORS = "auditors";
        this.TAB_DOCS = "docs";
        this.TAB_VIEWERS = "viewers";
        this.TAB_DUEDATES = "duedates";
        this.TAB_EXTENSIONS = "extensions";
        this.TAB_TRIGGERS = "triggers";
        this.TAB_ALERTSCHEDULES = "alertschedules";
        this.TAB_ACTIVATIONS = "activations";
        this.TAB_INVALIDATION = "invalidations";
        this.TAB_INTERNALCONTROLS = "internalcontrols";
        this.TAB_SIGNOFF = "signoff";
        this.TAB_FUNCTIONS = "functions";
        this.TAB_COUNTRIES = "countries";
        this.TAB_CALENDAR = "calendar";
        this.TAB_RCM_COMPLIANCES = "compliances";
        this.TAB_RCM_PROJECTS = "projects";
        this.TAB_RCM_DATE = "date";
        this.TAB_RCM_CONFIRM = "confirm";
        this.TAB_RCM_JOBS = "jobs";
        this.COLOR_APPROVED = "#50cf01";
        this.COLOR_NOT_STARTED = "#A4A9AD";
        this.COLOR_PENDING_APPROVAL = "#ffe505";
        this.COLOR_REJECTED = "#C80036";
        this.COLOR_PAST_DUE_DATE = "#ffe505";
        this.COLOR_LATE_EXECUTED = "#840B0F";
        this.COLOR_LATE_APPROVED = "#EE2F36";
        this.COLOR_LATE_REPORTED = "#Ef9C66";
        this.COLOR_SCHEDULED = "#888888";
        this.COLOR_NOT_COMPLIED = "#C80036";
        this.COLOR_PARTIALLY_COMPLIED = "#F79256";
        this.COLOR_COMPLIED = "#50cf01";
        this.CERTIFICATE_HTML = `
  
  <html>
    <head>  
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: Source Sans Pro;
          margin: 2px;
          padding: 20px;
          border: solid 5px gray;
          border-style: groove;
          background-color: #efefef;
        }
        .certificate-section {
          background-image: url('https://flagggrc-images.s3.amazonaws.com/certificate_background.jpg');
          background-size: cover;
          background-position: center;
          box-shadow: inset 2px 2px 6px rgba(5, 5, 5, 0.2);
          border-top: solid 1px rgba(255, 255, 255, 0.8);
          border-left: solid 1px rgba(255, 255, 255, 0.8);
          border-bottom: solid 1px rgba(255, 255, 255, 0.8);
          border-right: solid 1px rgba(255, 255, 255, 0.8);
          overflow:hidden;
          padding-top: 10px;
          padding-bottom: 20px;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 10px;
        }
        .certificate-section h1 {
          font-family: Belanosima;
          font-weight: 600;
        }
        .person-designation {
          text-transform: capitalize;
        }
        .status-format {
          text-transform: uppercase;
        }
        .text-center {
          text-align: center;
        }
        .d-flex {
          display: flex;
        }
        .justify-center {
          justify-content: center;
        }
        .justify-between {
          justify-content: space-between;
        }
        .align-center {
          align-items: center;
        }
        
        .w-25 {
          width: 25%;
        }
        .w-16 {
          width: 16%;
        }
        .w-14 {
          width: 14%;
        }
        .w-12 {
          width: 12%;
        }
        .w-100 {
          width: 100%;
        }
        .text-center {
          text-align: center;
        }
        table {
          box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
          border-top: solid 1px rgba(255, 255, 255, 0.8);
          border-left: solid 1px rgba(255, 255, 255, 0.8);
          border-bottom: solid 1px rgba(255, 255, 255, 0.8);
          border-right: solid 1px rgba(255, 255, 255, 0.8);
          overflow:hidden;
        }
        th {
          background-color: #6a6a6a;
          color: white;
          padding: 5px;
        }
        .td-thin {
          min-width: 150px;
        }
        .td-wide {
          min-width: 300px;
        }
        td {
          padding: 5px;
          font-size: 70%;
          vertical-align: top;
          min-width: 200px;
        }
        td span {
          font-size: 130% !important;
        }
        .td-odd {
          background-color: #efefef;
          
        }
        .td-even {
          background-color: #dedede;
        }
        .color-pending {
          color: #ffe505;
        }
        .color-pending-approval {
          color: #ffe505;
        }
        .color-not-started {
          color: #888888;
        }
        .color-not-complied {
          color: #C80036;
        }
        .color-partially-complied {
          color: #F79256;
        }
        .color-scheduled {
          color: #888888;
        }
        .color-complied {
          color: #50cf01;
        
        }
        .color-done {
          color: #50cf01;
        }
        .color-rejected {
          color: #C80036;
        }
        .color-approved {
          color: #50cf01;
        }
        .color-past-due-date {
          color: #ffe505;
        }
        .color-late-executed {
          color: #840B0F;
        }
        .color-late-approved {
          color: #EE2F36;
        }
        .color-late-reported {
          color: #Ef9C66;
        }
      </style>
    </head>
    <body>
      <div class="certificate-section">
        <h1 class="text-center">Certificate</h1>
        <p>I, PERSON_NAME, working as <span class="person-designation">PERSON_DESIGNATION</span> in PERSON_COMPANY, hereby declare that I am entrusted with the responsibility of ensuring compliance with various laws applicable to the company in the administration of business and the affairs of the company</p>
        <p>After having examined and considered all relevant information and based on the information furnished by the concerned officers, I, do hereby certify that the Finance / Technical / Administration / Legal wings / department of PERSON_COMPANY for the period PERSON_PERIOD, has in the conduct of business:</p>
        <ol>
          <li>Complied with all applicable laws, enactments, orders, rules, regulations, and other statutory requirements of the Central, State and other Statutory and local authorities concerning the business and affairs of the company;</li>
          <li>Paid all applicable statutory dues on due dates;</li>
          <li>Maintained proper registers, records, documents and books and filed proper returns, forms and statements and furnished necessary particulars to the relevant authorities; and</li>
          <li>Not done or committed any act or entered into any transactions in violation of any statutory provisions</li>
        </ol>
        <br /><br />
        <div class="d-flex justify-between align-center">
          <div>
            <div>Date: PERSON_DATE</div>
            <div>Place: </div>
          </div>
          <div>
            <div>Name: PERSON_NAME</div>
            <div class="person-designation">Role: PERSON_DESIGNATION</div>
          </div>
        </div>
      </div>
      <br /><br />
      <h3>Compliance Status</h3>
      PERSON_COMPLIANCE_STATUS
      <br /><br />
      <h3>Compliances List</h3>
      PERSON_COMPLIANCES
    </body>
  </html>
  
  `;
        this.COMPLIANCES_HTML = `
  
  <html>
    <head>  
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">  
      <link rel="preconnect" href="https://fonts.googleapis.com/">
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100;300;400;700;900&family=Oleo+Script&family=Oswald:wght@700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: DM Sans;
          margin: 2px;
          padding: 20px;
        }
        .status-format {
          text-transform: uppercase;
        }
        .text-center {
          text-align: center;
        }
        .d-flex {
          display: flex;
        }
        .justify-center {
          justify-content: center;
        }
        .justify-between {
          justify-content: space-between;
        }
        .align-center {
          align-items: center;
        }
        .mt-10 {
          margin-top: 10px;
        }
        .w-25 {
          width: 25%;
        }
        .w-16 {
          width: 16%;
        }
        .w-14 {
          width: 14%;
        }
        .w-12 {
          width: 12%;
        }
        .w-100 {
          width: 100%;
        }
        .w-200px {
          width: 200px;
        }
        .text-center {
          text-align: center;
        }
        table {
          box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
          border-top: solid 1px rgba(255, 255, 255, 0.8);
          border-left: solid 1px rgba(255, 255, 255, 0.8);
          border-bottom: solid 1px rgba(255, 255, 255, 0.8);
          border-right: solid 1px rgba(255, 255, 255, 0.8);
          overflow:auto;
        }
        th {
          background-color: #6a6a6a;
          color: white;
          padding: 5px;
        }
        .td-thin {
          min-width: 150px;
        }
        .td-wide {
          min-width: 300px;
        }
        td {
          padding: 5px;
          font-size: 70%;
          vertical-align: top;
          min-width: 200px;
        }
        td span {
          font-size: 130% !important;
        }
        .td-odd {
          background-color: #efefef;
          
        }
        .td-even {
          background-color: #dedede;
        }
        .color-pending {
          color: #ffe505;
        }
        .color-pending-approval {
          color: #ffe505;
        }
        .color-not-started {
          color: #888888;
        }
        .color-not-complied {
          color: #C80036;
        }
        .color-partially-complied {
          color: #F79256;
        }
        .color-complied {
          color: #50cf01;
        }
        .color-scheduled {
          color: #888888;
        }
        .color-done {
          color: #50cf01;
        }
        .color-rejected {
          color: #C80036;
        }
        .color-approved {
          color: #50cf01;
        }
        .color-past-due-date {
          color: #ffe505;
        }
        .color-late-executed {
          color: #840B0F;
        }
        .color-late-approved {
          color: #EE2F36;
        }
        .color-late-reported {
          color: #Ef9C66;
        }
        .h-100 {
          height: 100vh;
        }
        .abs {
          position: absolute;
        }
        .watermark {
          background-image: url(https://flagggrc-images.s3.amazonaws.com/logo.png);
          background-position: center;
          background-repeat: no-repeat;
          opacity: 5%;
          width: 100%;
          height: 100vh;
          position: fixed;
        }
        .scroll-x {
          display: block;
          overflow-x: auto;
        }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    </head>
    <body>
        <div>
          <h1>Compliance Report</h1>
          <div class="d-flex justify-between align-center">
            <div>
              <div>Report generated for PROJECT_NAME on REPORT_DATE</div>
            </div>
          </div>
          <br />
          <div class="watermark"></div>
          <div class="report">
            PERSON_COMPLIANCES
          </div>
        </div>
        <script>

        </script>
      </body>

  </html>
  
  `;
        this.MAPPING_HTML = `
  
  <html>
    <head>  
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
      <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
      <script type="module">

          import {LitElement, html, css} from 'https://esm.run/lit-element/lit-element.js';
          import {SfISelect} from 'https://esm.run/sf-i-select/sf-i-select.js';
          import {SfISubSelect} from 'https://esm.run/sf-i-sub-select/sf-i-sub-select.js';
          import {SfIForm} from 'https://esm.run/sf-i-form/sf-i-form.js';
          import {SfIElasticText} from 'https://esm.run/sf-i-elastic-text/sf-i-elastic-text.js';
          import {SfIUploader} from 'https://esm.run/sf-i-uploader/sf-i-uploader.js';
          import {SfIMultitextarea} from 'https://esm.run/sf-i-multitextarea/sf-i-multitextarea.js';
          
          // import {LitElement, html, css} from 'https://unpkg.com/lit-element@3.3.3/lit-element.js?module';
          // import {SfNav} from 'https://unpkg.com/sf-nav@1.0.94/sf-nav.js?module';
          // import {SfChartPie} from 'https://unpkg.com/sf-chart-pie@1.0.4/sf-chart-pie.js?module';
          // import {SfChartBar} from 'https://unpkg.com/sf-chart-bar@1.0.6/sf-chart-bar.js?module';
          // import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.89/sf-user-auth.js?module';
          // import {SfISelect} from 'https://unpkg.com/sf-i-select@1.0.91/sf-i-select.js?module';
          // import {SfISubSelect} from 'https://unpkg.com/sf-i-sub-select@1.0.82/sf-i-sub-select.js?module';
          // import {SfIForm} from 'https://unpkg.com/sf-i-form@1.0.125/sf-i-form.js?module';
          // import {SfIEvents} from 'https://unpkg.com/sf-i-events@1.0.469/sf-i-events.js?module';
          // import {SfIElasticText} from 'https://unpkg.com/sf-i-elastic-text@1.0.11/sf-i-elastic-text.js?module';
          // import {SfIUploader} from 'https://unpkg.com/sf-i-uploader@1.0.60/sf-i-uploader.js?module';
          // import {SfRandomText} from 'https://unpkg.com/sf-random-text@1.0.2/sf-random-text.js?module';
          // import {SfIMultitextarea} from 'https://unpkg.com/sf-i-multitextarea@1.0.16/sf-i-multitextarea.js?module';
          
      </script>
      <style>
        body {
          font-family: Source Sans Pro;
          margin: 2px;
          padding: 20px;
          background-color: #efefef;
        }
        .chosen {
          background-color: #E5FAD4 !important;
        }
        .td-head {
          text-transform: capitalize;
        }
        .status-format {
          text-transform: uppercase;
        }
        .text-center {
          text-align: center;
        }
        .d-flex {
          display: flex;
        }
        .justify-center {
          justify-content: center;
        }
        .justify-between {
          justify-content: space-between;
        }
        .align-center {
          align-items: center;
        }
        .w-25 {
          width: 25%;
        }
        .w-16 {
          width: 16%;
        }
        .w-14 {
          width: 14%;
        }
        .w-12 {
          width: 12%;
        }
        .w-100 {
          width: 100%;
        }
        .text-center {
          text-align: center;
        }
        table {
          box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
          border-top: solid 1px rgba(255, 255, 255, 0.8);
          border-left: solid 1px rgba(255, 255, 255, 0.8);
          border-bottom: solid 1px rgba(255, 255, 255, 0.8);
          border-right: solid 1px rgba(255, 255, 255, 0.8);
          overflow:hidden;
        }
        th {
          background-color: #6a6a6a;
          color: white;
          padding: 5px;
        }
        td {
          padding: 5px;
          font-size: 70%;
          vertical-align: top;
        }
        td span {
          font-size: 130% !important;
        }
        .td-odd {
          background-color: #efefef;
          
        }
        .td-even {
          background-color: #dedede;
        }
        .color-pending {
          color: #ffe505;
        }
        .color-pending-approval {
          color: #ffe505;
        }
        .color-not-started {
          color: #888888;
        }
        .color-not-complied {
          color: #C80036;
        }
        .color-partially-complied {
          color: #F79256;
        }
        .color-complied {
          color: #50cf01;
        }
        .color-scheduled {
          color: #888888;
        }
        .color-done {
          color: #50cf01;
        }
        .color-rejected {
          color: #C80036;
        }
        .color-approved {
          color: #50cf01;
        }
        .color-past-due-date {
          color: #ffe505;
        }
        .color-late-executed {
          color: #840B0F;
        }
        .color-late-approved {
          color: #EE2F36;
        }
        .color-late-reported {
          color: #Ef9C66;
        }
      </style>
    </head>
    <body>
      TABLE_DATA
    </body>
  </html>
  
  `;
        this.TAGGING_HTML = `
    
    <html>
      <head>  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
        <script type="module">

            import {LitElement, html, css} from 'https://esm.run/lit-element/lit-element.js';
            import {SfISelect} from 'https://esm.run/sf-i-select/sf-i-select.js';
            import {SfISubSelect} from 'https://esm.run/sf-i-sub-select/sf-i-sub-select.js';
            import {SfIForm} from 'https://esm.run/sf-i-form/sf-i-form.js';
            import {SfIElasticText} from 'https://esm.run/sf-i-elastic-text/sf-i-elastic-text.js';
            import {SfIUploader} from 'https://esm.run/sf-i-uploader/sf-i-uploader.js';
            import {SfIMultitextarea} from 'https://esm.run/sf-i-multitextarea/sf-i-multitextarea.js';
            
            // import {LitElement, html, css} from 'https://unpkg.com/lit-element@3.3.3/lit-element.js?module';
            // import {SfNav} from 'https://unpkg.com/sf-nav@1.0.94/sf-nav.js?module';
            // import {SfChartPie} from 'https://unpkg.com/sf-chart-pie@1.0.4/sf-chart-pie.js?module';
            // import {SfChartBar} from 'https://unpkg.com/sf-chart-bar@1.0.6/sf-chart-bar.js?module';
            // import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.89/sf-user-auth.js?module';
            // import {SfISelect} from 'https://unpkg.com/sf-i-select@1.0.91/sf-i-select.js?module';
            // import {SfISubSelect} from 'https://unpkg.com/sf-i-sub-select@1.0.82/sf-i-sub-select.js?module';
            // import {SfIForm} from 'https://unpkg.com/sf-i-form@1.0.125/sf-i-form.js?module';
            // import {SfIEvents} from 'https://unpkg.com/sf-i-events@1.0.469/sf-i-events.js?module';
            // import {SfIElasticText} from 'https://unpkg.com/sf-i-elastic-text@1.0.11/sf-i-elastic-text.js?module';
            // import {SfIUploader} from 'https://unpkg.com/sf-i-uploader@1.0.60/sf-i-uploader.js?module';
            // import {SfRandomText} from 'https://unpkg.com/sf-random-text@1.0.2/sf-random-text.js?module';
            // import {SfIMultitextarea} from 'https://unpkg.com/sf-i-multitextarea@1.0.16/sf-i-multitextarea.js?module';
            
        </script>
        <style>
          body {
            font-family: Source Sans Pro;
            margin: 2px;
            padding: 20px;
            background-color: #efefef;
          }
          .chosen {
            background-color: #E5FAD4 !important;
          }
          .td-head {
            text-transform: capitalize;
          }
          .status-format {
            text-transform: uppercase;
          }
          .text-center {
            text-align: center;
          }
          .d-flex {
            display: flex;
          }
          .justify-center {
            justify-content: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .align-center {
            align-items: center;
          }
          .w-25 {
            width: 25%;
          }
          .w-16 {
            width: 16%;
          }
          .w-14 {
            width: 14%;
          }
          .w-12 {
            width: 12%;
          }
          .w-100 {
            width: 100%;
          }
          .text-center {
            text-align: center;
          }
          table {
            box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
            border-top: solid 1px rgba(255, 255, 255, 0.8);
            border-left: solid 1px rgba(255, 255, 255, 0.8);
            border-bottom: solid 1px rgba(255, 255, 255, 0.8);
            border-right: solid 1px rgba(255, 255, 255, 0.8);
            overflow:hidden;
          }
          th {
            background-color: #6a6a6a;
            color: white;
            padding: 5px;
          }
          td {
            padding: 5px;
            font-size: 70%;
            vertical-align: top;
          }
          td span {
            font-size: 130% !important;
          }
          .td-odd {
            background-color: #efefef;
            
          }
          .td-even {
            background-color: #dedede;
          }
          .color-pending {
            color: #ffe505;
          }
          .color-pending-approval {
            color: #ffe505;
          }
          .color-not-started {
            color: #888888;
          }
          .color-not-complied {
            color: #C80036;
          }
          .color-partially-complied {
            color: #F79256;
          }
          .color-complied {
            color: #50cf01;
          }
          .color-scheduled {
            color: #888888;
          }
          .color-done {
            color: #50cf01;
          }
          .color-rejected {
            color: #C80036;
          }
          .color-approved {
            color: #50cf01;
          }
          .color-past-due-date {
            color: #ffe505;
          }
          .color-late-executed {
            color: #840B0F;
          }
          .color-late-approved {
            color: #EE2F36;
          }
          .color-late-reported {
            color: #Ef9C66;
          }
        </style>
      </head>
      <body>
        TABLE_DATA
      </body>
      <script>
        var preselectedValues = TABLE_VALUES;
        const inputs = document.querySelectorAll('.tags-input');
        for(var i = 0; i < inputs.length; i++) {
          inputs[i].preselectedValues = preselectedValues[i];
        }
      </script>
    </html>
  
  `;
        this.AUTOSAVE_FLAG = true;
        this.EXCLUDE_COLS_FROM_REGS = ["updatetype", "question", "invalidations", "activations", "alertschedule", "clientquestion", "shortid", "countryname", "countryid", "entityname", "entityid", "locationname", "locationid", "reporters", "approvers", "timeframe", "responsedays", "execmodule", "functions", "shortnumid", "countries", "entities", "locations", "tagsmap", "reportersmap", "approversmap", "functionheadsmap", "auditorsmap", "viewersmap", "approved", "documents", "comments", "lastupdated", "dateofcompletion", "mmdd", "completeness", "timeliness", "compliance", "delta", "triggers"];
        this.chartSelectedLegend = [];
        this.selectedFilter = null;
        this.barCharDataSet2 = [];
        this.barCharDataSet2Arr = [];
        this.barCharDataSet3 = [];
        this.barCharDataSet3Arr = [];
        this.barCharDataSet4 = [];
        this.barCharDataSet4Arr = [];
        this.filteronboarding = '[]';
        this.getfilterOnboarding = () => {
            return JSON.parse(this.filteronboarding);
        };
        this.getFilterOnboardingString = () => {
            const jsonFilterOnboarding = JSON.parse(this.filteronboarding);
            var html = '';
            html += '<h5>Mapped Locations</h5>';
            html += '<table>';
            html += '<tr>';
            html += '<th part="td-head">';
            html += 'Country';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'State';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Location';
            html += '</th>';
            html += '</tr>';
            let count = 0;
            for (var i = 0; i < jsonFilterOnboarding.length; i++) {
                var country = jsonFilterOnboarding[i].country;
                if (jsonFilterOnboarding[i].locations != null && Object.keys(jsonFilterOnboarding[i].locations).length > 0) {
                    for (var j = 0; j < Object.keys(jsonFilterOnboarding[i].locations).length; j++) {
                        const state = Object.keys(jsonFilterOnboarding[i].locations)[j];
                        var classBg = '';
                        if (count % 2 === 0) {
                            classBg = 'td-light';
                        }
                        else {
                            classBg = 'td-dark';
                        }
                        html += '<tr>';
                        html += '<td part="td-body1" class="' + classBg + '">';
                        html += country;
                        html += '</td>';
                        html += '<td part="td-body1" class="' + classBg + '">';
                        html += state;
                        html += '</td>';
                        html += '<td part="td-body1" class="' + classBg + '">';
                        //console.log('gettinglocations', (jsonFilterOnboarding[i]['locations'][state]));
                        var tempHtml = '';
                        for (var k = 0; k < (jsonFilterOnboarding[i]['locations'][state]).length; k++) {
                            const location = (jsonFilterOnboarding[i]['locations'][state])[k];
                            tempHtml += location;
                            if (k < ((jsonFilterOnboarding[i]['locations'][state]).length - 1)) {
                                tempHtml += ', ';
                            }
                        }
                        html += ('<div><sf-i-elastic-text class="statute-summary id-9" text="' + tempHtml + '" minlength="50"></sf-i-elastic-text></div>');
                        html += '</td>';
                        html += '</tr>';
                        count++;
                    }
                }
            }
            html += '</table>';
            html += '<h5 class="mt-20">Mapped Laws</h5>';
            html += '<table>';
            html += '<tr>';
            html += '<th part="td-head">';
            html += 'Country';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'State';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Subcategory';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Exclusions';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Inclusions';
            html += '</th>';
            html += '</tr>';
            for (var i = 0; i < jsonFilterOnboarding.length; i++) {
                var classBg = '';
                if (i % 2 === 0) {
                    classBg = 'td-light';
                }
                else {
                    classBg = 'td-dark';
                }
                html += '<tr>';
                html += '<td part="td-body1" class="' + classBg + '">';
                html += jsonFilterOnboarding[i].country;
                html += '</td>';
                html += '<td part="td-body1" class="' + classBg + '">';
                for (var j = 0; j < jsonFilterOnboarding[i].states.length; j++) {
                    html += ('<div>' + (jsonFilterOnboarding[i].states[j].length === 0 ? 'Federal' : jsonFilterOnboarding[i].states[j]) + '</div>');
                }
                html += '</td>';
                html += '<td part="td-body1" class="' + classBg + '">';
                for (var j = 0; j < jsonFilterOnboarding[i].subcategories.length; j++) {
                    html += ('<div>' + jsonFilterOnboarding[i].subcategories[j] + '</div>');
                }
                html += '</td>';
                html += '<td part="td-body1" class="' + classBg + '">';
                if (jsonFilterOnboarding[i].excludestatutes != null) {
                    for (var j = 0; j < jsonFilterOnboarding[i].excludestatutes.length; j++) {
                        html += ('<div><sf-i-elastic-text class="statute-summary id-9" text="' + jsonFilterOnboarding[i].excludestatutes[j] + '" minlength="10"></sf-i-elastic-text></div>');
                    }
                }
                html += '</td>';
                html += '<td part="td-body1" class="' + classBg + '">';
                if (jsonFilterOnboarding[i].includestatutes != null) {
                    for (var j = 0; j < jsonFilterOnboarding[i].includestatutes.length; j++) {
                        html += ('<div><sf-i-elastic-text class="statute-summary id-9" text="' + jsonFilterOnboarding[i].includestatutes[j] + '" minlength="20"></sf-i-elastic-text></div>');
                    }
                }
                html += '</td>';
                html += '</tr>';
            }
            html += '</table>';
            return html;
        };
        this.getLocations = () => {
            return JSON.parse(this.locations);
        };
        this.getLocationsByCountry = (country, statute) => {
            let locations = [];
            if (this.getLocations()[country] != null) {
                const states = Object.keys(this.getLocations()[country]);
                for (var i = 0; i < states.length; i++) {
                    if (this.getfilterOnboarding().length === 0) {
                        locations.push(...this.getLocations()[country][states[i]]);
                    }
                    else {
                        for (var j = 0; j < this.getLocations()[country][states[i]].length; j++) {
                            for (var k = 0; k < this.getfilterOnboarding().length; k++) {
                                if (this.getfilterOnboarding()[k]['country'] == country) {
                                    if (this.getfilterOnboarding()[k]['locations'] != null) {
                                        if (this.getfilterOnboarding()[k]['locations'][states[i]] != null) {
                                            var push = true;
                                            if (this.getfilterOnboarding()[k]['locations'][states[i]].includes(this.getLocations()[country][states[i]][j])) {
                                                if (this.getfilterOnboarding()[k]['excludelocations'] == null) {
                                                }
                                                else {
                                                    if (this.getfilterOnboarding()[k]['excludelocations'][statute] == null) {
                                                    }
                                                    else {
                                                        if (this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]] == null) {
                                                        }
                                                        else {
                                                            if (statute == "Information Technology Act, 2000") {
                                                                //console.log("getLocationsByCountry", push, this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]], this.getLocations()[country][states[i]][j], this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]].includes(this.getLocations()[country][states[i]][j]));
                                                            }
                                                            if (this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]].includes(this.getLocations()[country][states[i]][j])) {
                                                                //console.log("getLocationsByCountry", 'setting false');
                                                                push = false;
                                                            }
                                                        }
                                                    }
                                                    if (statute == "Information Technology Act, 2000") {
                                                        //console.log("getLocationsByCountry", push, this.getLocations()[country][states[i]][j]);
                                                    }
                                                }
                                            }
                                            else {
                                                push = false;
                                            }
                                        }
                                        else {
                                            push = false;
                                        }
                                    }
                                    else {
                                        push = false;
                                    }
                                    if (push) {
                                        locations.push(this.getLocations()[country][states[i]][j]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return locations;
        };
        this.getLocationsByState = (country, state, statute) => {
            //console.log('getting getLocationsByState', country, state, this.getfilterOnboarding());
            let locations = [];
            if (this.getLocations()[country] != null) {
                if (this.getLocations()[country][state] != null) {
                    if (this.getLocations()[country][state] != null) {
                        if (this.getfilterOnboarding().length === 0) {
                            locations.push(...this.getLocations()[country][state]);
                        }
                        else {
                            for (var k = 0; k < this.getfilterOnboarding().length; k++) {
                                if (this.getfilterOnboarding()[k]['country'] == country) {
                                    for (var i = 0; i < this.getLocations()[country][state].length; i++) {
                                        var push = true;
                                        if (this.getfilterOnboarding()[k]['locations'] != null) {
                                            if (this.getfilterOnboarding()[k]['locations'][state] != null) {
                                                if (this.getfilterOnboarding()[k]['locations'][state].includes(this.getLocations()[country][state][i])) {
                                                    if (this.getfilterOnboarding()[k]['excludelocations'] == null) {
                                                    }
                                                    else {
                                                        if (this.getfilterOnboarding()[k]['excludelocations'][statute] == null) {
                                                        }
                                                        else {
                                                            if (this.getfilterOnboarding()[k]['excludelocations'][statute][state] == null) {
                                                            }
                                                            else {
                                                                if (this.getfilterOnboarding()[k]['excludelocations'][statute][state].includes(this.getLocations()[country][state][i])) {
                                                                    push = false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    push = false;
                                                }
                                            }
                                            else {
                                                push = false;
                                            }
                                        }
                                        else {
                                            push = false;
                                        }
                                        if (push) {
                                            locations.push(this.getLocations()[country][state][i]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //console.log('getting getLocationsByState return ', locations);
            return locations;
        };
        this.selectedCbs = [];
        this.contractStartDate = "";
        this.disableflagggrcresponse = "";
        this.disablesave = "";
        this.disableclientresponse = "";
        this.disablesignoff = "";
        this.graphParam = "";
        this.entityId = "";
        this.locationId = "";
        this.showRegisterExport = "false";
        this.countryId = "";
        this.functionId = "";
        this.tagId = "";
        this.myOnboardingTab = "";
        this.myOnboardingTabGroup = "";
        this.myRcmTab = this.TAB_RCM_COMPLIANCES;
        this.myRole = "";
        this.chart = null;
        this.chart2 = null;
        this.chart3 = null;
        this.chart4 = null;
        this.calendar = [];
        this.mappedValuesDueDates = {};
        this.mappedValuesUsers = {};
        this.mappedValuesTags = {};
        this.unmappedEvents = null;
        this.mappings = null;
        this.triggers = null;
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.events = null;
        this.streamIndex = null;
        this.eventsInWindow = null;
        this.eventHideFields = null;
        this.getEventHideFields = () => {
            return JSON.parse(this.eventHideFields);
        };
        this.eventPreviewFields = null;
        this.getEventPreviewFields = () => {
            return JSON.parse(this.eventPreviewFields);
        };
        this.eventFields = null;
        this.getEventFields = () => {
            return JSON.parse(this.eventFields);
        };
        this.eventFieldDependencies = null;
        this.getEventFieldDependencies = () => {
            return JSON.parse(this.eventFieldDependencies);
        };
        this.getApiBodyList = () => {
            //console.log('calendar api body list', this.apiBodyList);
            try {
                return JSON.parse(this.apiBodyList);
            }
            catch (e) {
                return {};
            }
        };
        this.getApiBodyDetail = () => {
            return JSON.parse(this.apiBodyDetail);
        };
        this.csvDataRegisters = "";
        this.csvDataCompliances = "";
        this.csvTableData = "";
        this.csvDataStats = "";
        this.csvGraphStats = "";
        this.csvCompletenessStats = "";
        this.csvTimelinessStats = "";
        this.csvComplianceStats = "";
        this.htmlDataCompliances = "";
        this.htmlDataStats = "";
        this.period = "";
        this.flowRcmNotification = 0;
        this.flowGraph = "";
        this.flow = "";
        this.fill = "solid";
        this.filterTags = [];
        this.subfilter = "";
        this.riskAreasData = null;
        this.riskAreasPartStatusData = null;
        this.riskAreasLateStatusData = null;
        this.riskAreasComplianceStatusData = null;
        this.riskSeverityData = null;
        this.arrCols = ["country", "state", "obligationtitle", "statute", "category"];
        this.arrRcmProjectCols = ["name"];
        this.riskSeverityPartStatusData = null;
        this.riskSeverityLateStatusData = null;
        this.riskSeverityComplianceStatusData = null;
        this.functionData = null;
        this.functionPartStatusData = null;
        this.functionLateStatusData = null;
        this.functionComplianceStatusData = null;
        this.obligationTypeData = null;
        this.obligationTypePartStatusData = null;
        this.obligationTypeLateStatusData = null;
        this.obligationTypeComplianceStatusData = null;
        this.jurisdictionData = null;
        this.jurisdictionPartStatusData = null;
        this.jurisdictionLateStatusData = null;
        this.jurisdictionComplianceStatusData = null;
        this.currentColumnIndex = "";
        this.frequencyData = null;
        this.frequencyPartStatusData = null;
        this.frequencyLateStatusData = null;
        this.frequencyComplianceStatusData = null;
        this.subcategoryData = null;
        this.subcategoryPartStatusData = null;
        this.subcategoryLateStatusData = null;
        this.subcategoryComplianceStatusData = null;
        this.locationData = null;
        this.locationPartStatusData = null;
        this.locationLateStatusData = null;
        this.locationComplianceStatusData = null;
        this.selectedItems = [];
        this.selectedStatus = "";
        this.selectedTab = "";
        this.selectedCountryTab = -1;
        this.restrictToMapping = "";
        this.enableDeleteLatestReport = "";
        this.stream = this.TAB_STREAM;
        this.isSelectedLegend = (value) => {
            return this.chartSelectedLegend.includes(value);
        };
        this.removeFromSelectedLegend = (value) => {
            const index = this.chartSelectedLegend.indexOf(value);
            if (index > -1) { // only splice array when item is found
                this.chartSelectedLegend.splice(index, 1); // 2nd parameter means remove one item only
            }
        };
        this.clearSelectedLegend = () => {
            this.chartSelectedLegend = [];
            if (this.chart != null) {
                this.chart.data.datasets[0].data.forEach((_d, i) => {
                    //console.log(d);
                    this.chart.getDatasetMeta(0).data[i].hidden = false;
                    this.chart.update();
                });
            }
            if (this.chart2 != null && this.chart3 != null && this.chart4 != null) {
                if (this.barCharDataSet2Arr.length > 0 && this.barCharDataSet3Arr.length > 0 && this.barCharDataSet4Arr.length > 0) {
                    do {
                        this.chart2.data.datasets = this.barCharDataSet2Arr.pop();
                        this.chart3.data.datasets = this.barCharDataSet3Arr.pop();
                        this.chart4.data.datasets = this.barCharDataSet4Arr.pop();
                    } while (this.barCharDataSet2Arr.length > 0);
                }
                else {
                    if (this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
                        this.barCharDataSet2.pop();
                        this.barCharDataSet3.pop();
                        this.barCharDataSet4.pop();
                    }
                }
            }
            this.selectedFilter = null;
        };
        this.clearSelectedGraphParam = () => {
            //console.log('clickonbar clearing graph param', this.chart, this.chart2, this.chart3);
            this.graphParam = "";
            if (this.chart != null) {
                this.chart.update();
            }
            if (this.chart2 != null && this.chart3 != null && this.chart4 != null) {
                if (this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
                    this.chart2.data.datasets = this.barCharDataSet2.pop();
                    this.chart3.data.datasets = this.barCharDataSet3.pop();
                    this.chart4.data.datasets = this.barCharDataSet4.pop();
                }
            }
            else {
                if (this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
                    this.barCharDataSet2.pop();
                    this.barCharDataSet3.pop();
                    this.barCharDataSet4.pop();
                }
            }
            this.processGraphFilter("");
            this.selectedFilter = null;
        };
        this.getEventField = (field) => {
            for (var i = 0; i < this.getEventFields().length; i++) {
                if (this.getEventFields()[i].field == field) {
                    return this.getEventFields()[i];
                }
            }
        };
        this.getParentFieldFromDepedencies = (field) => {
            for (var i = 0; i < this.getEventFieldDependencies().length; i++) {
                if (this.getEventFieldDependencies()[i].type == "foreignkey" && this.getEventFieldDependencies()[i].child == field) {
                    return this.getEventFieldDependencies()[i].parent;
                }
            }
            return null;
        };
        this.getEventTexts = (field, selectedId, row) => {
            console.log('get event texts', field, selectedId, row);
            if (this.getEventField(field) != null && this.getEventField(field).type == "sf-i-select") {
                var selectedIds = "";
                selectedIds += '[';
                for (var i = 0; i < selectedId.length; i++) {
                    selectedIds += ('&quot;' + selectedId[i] + '&quot;');
                    if (i < selectedId.length - 1) {
                        selectedIds += ',';
                    }
                }
                selectedIds += ']';
                return '<sf-i-select apiId="' + this.getEventField(field).apiId + '" name="Select" label="Select" mode="text" selectedId="' + selectedIds + '"></sf-i-select>';
            }
            if (this.getEventField(field) != null && this.getEventField(field).type == "sf-i-sub-select") {
                const parentField = this.getParentFieldFromDepedencies(field);
                //console.log('parentfield', parentField);
                var selectedIds = "";
                selectedIds += '[';
                for (var i = 0; i < selectedId.length; i++) {
                    selectedIds += ('&quot;' + selectedId[i] + '&quot;');
                    if (i < selectedId.length - 1) {
                        selectedIds += ',';
                    }
                }
                selectedIds += ']';
                const filterId = JSON.parse(row[parentField])[0];
                //console.log('<sf-i-sub-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'" filterId="'+filterId+'"></sf-i-sub-select>');
                return '<sf-i-sub-select apiId="' + this.getEventField(field).apiId + '" name="Select" label="Select" mode="text" selectedId="' + selectedIds + '" filterId="' + filterId + '"></sf-i-sub-select>';
            }
            if (this.getEventField(field) != null && this.getEventField(field).type == "sf-i-form") {
                //console.log('<sf-i-form name="Select" apiId="'+this.getEventField(field).apiId+'" selectedId="'+selectedId[0]+'" projectField="'+this.getEventField(field).projectField+'" mode="text"></sf-i-form>');
                return '<sf-i-form name="Select" apiId="' + this.getEventField(field).apiId + '" selectedId="' + selectedId[0] + '" projectField="' + this.getEventField(field).projectField + '" mode="text"></sf-i-form>';
            }
            return "";
        };
        this.clearTabs = () => {
            this._SfCalendarContainer.style.display = 'none';
            this._SfStreamContainer.style.display = 'none';
            this._SfUpcomingContainer.style.display = 'none';
            this._SfThisContainer.style.display = 'none';
            this._SfPastContainer.style.display = 'none';
            this._SfCustomContainer.style.display = 'none';
            this._SfAdhocContainer.style.display = 'none';
            this._SfFindContainer.style.display = 'none';
            this._SfRegisterContainer.style.display = 'none';
        };
        this.enableCalendar = () => {
            this.clearTabs();
            this._SfCalendarContainer.style.display = 'flex';
        };
        this.enableStream = () => {
            this.clearTabs();
            this._SfStreamContainer.style.display = 'flex';
        };
        this.prepareXhrPresigned = async (data, url, loaderElement, loaderText = '') => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
                loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
            }
            return await Util.callApiPresigned(url, data);
        };
        this.prepareXhrPresignedGet = async (url, loaderElement, loaderText = '') => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
                loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
            }
            return await Util.callApiPresignedGet(url);
        };
        this.prepareXhrPresignedDelete = async (url, loaderElement, loaderText = '') => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
                loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
            }
            return await Util.callApiPresignedDelete(url);
        };
        this.prepareXhr = async (data, url, loaderElement, authorization, loaderText = '') => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
                loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
            }
            return await Util.callApi(url, data, authorization);
        };
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfRowError.style.display = 'flex';
            this._SfRowErrorMessage.innerHTML = msg;
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'flex';
            this._SfRowSuccessMessage.innerHTML = msg;
        };
        this.getLastDayOfLastMonth = (month, year) => {
            const date = new Date(year, month, 0);
            return date.getDate();
        };
        this.getLastDayOfMonth = (month, year) => {
            const date = new Date(year, month + 1, 0);
            return date.getDate();
        };
        this.getFirstDateOfLastWeek = (startDate) => {
            const sd = new Date(startDate.getTime());
            var first = sd.getDate() - sd.getDay();
            var firstday = new Date(sd.setDate(first));
            for (var i = 0; i < 7; i++) {
                firstday.setDate(firstday.getDate() - 1);
            }
            return firstday;
        };
        this.getFirstDateOfWeek = (startDate) => {
            const sd = new Date(startDate.getTime());
            var first = sd.getDate() - sd.getDay();
            var firstday = new Date(sd.setDate(first));
            return firstday;
        };
        this.getBlanks = (month, year) => {
            const date = new Date(("0" + (month + 1)).slice(-2) + '/01/' + year);
            const day = date.getDay();
            return day;
        };
        this.getMonthStatus = (month, year) => {
            //html += '<div class="d-flex align-baseline flex-grow flex-wrap">';
            // const currMonth = new Date().getMonth();
            // const currDate = new Date().getDate();
            //console.log('currmonth', currMonth, 'currdate', currDate);
            var approved = 0;
            var pendingApproval = 0;
            var rejected = 0;
            var notStarted = 0;
            var total = 0;
            for (var i = 0; i < this.getLastDayOfMonth(month, year); i++) {
                const mmdd = ("0" + (month + 1)).slice(-2) + "/" + ("0" + (i + 1)).slice(-2);
                if (month === 1 && i === (this.getLastDayOfMonth(month, year) - 1)) {
                    //console.log('getLastDayOfMonth', month, this.getLastDayOfMonth(month, year), mmdd);
                }
                if (this.events[mmdd] != null) {
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        const partStatus = this.getCompletenessStatus(this.events[mmdd][j]);
                        if (partStatus == "approved") {
                            approved++;
                        }
                        if (partStatus == "not-started") {
                            notStarted++;
                        }
                        if (partStatus == "pending-approval") {
                            pendingApproval++;
                        }
                        if (partStatus == "rejected") {
                            rejected++;
                        }
                    }
                }
            }
            //console.log('month-status', approved, pendingApproval, rejected, notStarted, total);
            var percApproved = (approved * 100) / total;
            var percPendingApproval = (pendingApproval * 100) / total;
            var percRejected = (rejected * 100) / total;
            var percNotStarted = (notStarted * 100) / total;
            return { percNotStarted: percNotStarted, percPendingApproval: percPendingApproval, percApproved: percApproved, percRejected: percRejected };
        };
        this.insertDates = (month, year) => {
            var html = "";
            html += '<div part="bg-calendar" class="d-flex align-baseline flex-grow flex-wrap p-10">';
            const dateNumber = this.getLastDayOfLastMonth(month, year);
            for (var i = 0; i < this.getBlanks(month, year); i++) {
                html += '<div class="day-item date-item-before fw-100">';
                html += dateNumber - (this.getBlanks(month, year) - i - 1);
                html += '</div>';
            }
            const currMonth = new Date().getMonth();
            const currDate = new Date().getDate();
            //console.log('currmonth', currMonth, 'currdate', currDate);
            for (i = 0; i < this.getLastDayOfMonth(month, year); i++) {
                const mmdd = ("0" + (month + 1)).slice(-2) + "/" + ("0" + (i + 1)).slice(-2);
                var partName = "";
                if (this.events[mmdd] != null) {
                    partName = "event-calendar-day-with-event";
                    html += '<div part="' + partName + '" class="day-item date-item fw-600">';
                    if (month === currMonth && (i + 1) === currDate) {
                        html += '<div part="event-calendar-day-today">';
                        html += (i + 1);
                        html += '</div>';
                    }
                    else {
                        html += '<div>';
                        html += (i + 1);
                        html += '</div>';
                    }
                    var approved = 0;
                    var pendingApproval = 0;
                    var rejected = 0;
                    var notStarted = 0;
                    var total = 0;
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        const partStatus = this.getCompletenessStatus(this.events[mmdd][j]);
                        if (partStatus == "approved") {
                            approved++;
                        }
                        if (partStatus == "pending-approval") {
                            pendingApproval++;
                        }
                        if (partStatus == "rejected") {
                            rejected++;
                        }
                        if (partStatus == "not-started") {
                            notStarted++;
                        }
                    }
                    var percApproved = (approved * 100) / total;
                    var percPendingApproval = (pendingApproval * 100) / total;
                    var percNotStarted = (notStarted * 100) / total;
                    var percRejected = (rejected * 100) / total;
                    //console.log('percentages', mmdd, percApproved, percPendingApproval, percRejected, percNotStarted)
                    html += '<div class="d-flex justify-center">';
                    //html += '<div part="event-date-indicator-primary" class="dot"></div>'
                    html += '<div class="dot" style="width: ' + (percApproved / 2) + '%; background-color: ' + this.COLOR_APPROVED + '"></div>';
                    html += '<div class="dot" style="width: ' + (percPendingApproval / 2) + '%; background-color: ' + this.COLOR_PENDING_APPROVAL + '"></div>';
                    html += '<div class="dot" style="width: ' + (percRejected / 2) + '%; background-color: ' + this.COLOR_REJECTED + '"></div>';
                    html += '<div class="dot" style="width: ' + (percNotStarted / 2) + '%; background-color: ' + this.COLOR_NOT_STARTED + '"></div>';
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    partName = "event-calendar-day-without-event";
                    html += '<div part="' + partName + '" class="day-item date-item fw-100">';
                    // html += '<div>'
                    //   html += (i + 1);
                    // html += '</div>'
                    if (month === currMonth && (i + 1) === currDate) {
                        html += '<div part="event-calendar-day-today">';
                        html += (i + 1);
                        html += '</div>';
                    }
                    else {
                        html += '<div>';
                        html += (i + 1);
                        html += '</div>';
                    }
                    html += '</div>';
                }
            }
            for (i = 0; i < 42 - (this.getBlanks(month, year) + this.getLastDayOfMonth(month, year)); i++) {
                html += '<div class="day-item date-item-before fw-100">';
                html += (i + 1);
                html += '</div>';
            }
            html += '</div>';
            return html;
        };
        this.insertDayNames = () => {
            var html = "";
            html += '<div part="bg-calendar" class="d-flex align-center flex-grow p-10">';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'S';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'M';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'T';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'W';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'T';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'F';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'S';
            html += '</div>';
            html += '</div>';
            return html;
        };
        this.getYearFromMonthAndCalendarStart = (mm) => {
            var yyyy = "";
            var currMonth = new Date().getMonth() + 1;
            if (parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
                //console.log('getpastduedate returning', 0);
                yyyy = parseInt(this.calendarStartYYYY) + "";
            }
            else if (parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
                //console.log('getpastduedate returning', 1);
                yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
            }
            else if (parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
                //console.log('getpastduedate returning', 2);
                yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
            }
            else if (parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
                //console.log('getpastduedate returning', 3);
                yyyy = (parseInt(this.calendarStartYYYY)) + "";
            }
            return yyyy;
        };
        this.getPastDueDate = (mmdd) => {
            const dd = mmdd.substring(3, 5);
            const mm = mmdd.substring(0, 2);
            //console.log('getpastduedate', mmdd, dd, mm);
            // var yyyy = "";
            // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
            //   //console.log('getpastduedate returning', 0);
            //   yyyy = parseInt(this.calendarStartYYYY) + "";
            // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
            //   //console.log('getpastduedate returning', 1);
            //   yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
            // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            //   //console.log('getpastduedate returning', 2);
            //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
            // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            //   //console.log('getpastduedate returning', 3);
            //   yyyy = (parseInt(this.calendarStartYYYY)) + "";
            // }
            var yyyy = this.getYearFromMonthAndCalendarStart(mm);
            var date = new Date();
            date.setMonth(parseInt(mm) - 1);
            date.setDate(parseInt(dd));
            date.setFullYear(parseInt(yyyy));
            var currDate = new Date();
            if (currDate.getTime() > date.getTime()) {
                //console.log('getpastduedate returning true', yyyy);
                return true;
            }
            return false;
        };
        this.getLateExecuted = (mmdd, event) => {
            //console.log('late executed', mmdd, event.dateofcompletion)
            const tsDoc = new Date(parseInt(event.dateofcompletion)).getTime();
            const dd = mmdd.substring(3, 5);
            const mm = mmdd.substring(0, 2);
            // var yyyy = "";
            // var currMonth = new Date().getMonth() + 1;
            // // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
            // //   yyyy = new Date().getFullYear() + "";
            // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
            // //   yyyy = (new Date().getFullYear() - 1) + "";
            // // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            // //   yyyy = (new Date().getFullYear() + 1) + "";
            // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            // //   yyyy = (new Date().getFullYear() + 1) + "";
            // // }
            // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
            //   yyyy = parseInt(this.calendarStartYYYY) + "";
            // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
            //   yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
            // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
            // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
            // }
            var yyyy = this.getYearFromMonthAndCalendarStart(mm);
            var date = new Date();
            date.setMonth(parseInt(mm) - 1);
            date.setDate(parseInt(dd));
            date.setFullYear(parseInt(yyyy));
            const tsCurr = date.getTime();
            //console.log('late executed', mmdd, tsDoc, tsCurr)
            if (tsDoc > tsCurr) {
                //console.log('late executed', true)
                return true;
            }
            return false;
        };
        this.getLateReported = (mmdd, event) => {
            const dd = mmdd.substring(3, 5);
            const mm = mmdd.substring(0, 2);
            var yyyy = this.getYearFromMonthAndCalendarStart(mm);
            var date = new Date();
            date.setMonth(parseInt(mm) - 1);
            date.setDate(parseInt(dd));
            date.setFullYear(parseInt(yyyy));
            const tsCurr = date.getTime();
            for (var i = event.comments.length - 1; i >= 0; i--) {
                const comment = event.comments[i];
                const tsComment = new Date(comment.timestamp);
                const authorComment = comment.author;
                if (authorComment == "Reporter" && tsComment.getTime() > tsCurr) {
                    return true;
                }
            }
            return false;
        };
        this.getLateApproved = (mmdd, event) => {
            const dd = mmdd.substring(3, 5);
            const mm = mmdd.substring(0, 2);
            var yyyy = this.getYearFromMonthAndCalendarStart(mm);
            var date = new Date();
            date.setMonth(parseInt(mm) - 1);
            date.setDate(parseInt(dd));
            date.setFullYear(parseInt(yyyy));
            const tsCurr = date.getTime();
            for (var i = event.comments.length - 1; i >= 0; i--) {
                const comment = event.comments[i];
                const tsComment = new Date(comment.timestamp);
                const authorComment = comment.author;
                if (authorComment == "Approver" && tsComment.getTime() > tsCurr) {
                    return true;
                }
            }
            return false;
            // //console.log('get late approved', event.obligationtitle, event.lastupdated, mmdd, event.lastupdated);
            // const tsLastUpdated = new Date((event.lastupdated)).getTime();
            // //console.log('get late approved', tsLastUpdated);
            // const dd = mmdd.substring(3, 5);
            // const mm = mmdd.substring(0, 2);
            // var yyyy = this.getYearFromMonthAndCalendarStart(mm);
            // var date = new Date();
            // date.setMonth(parseInt(mm) - 1);
            // date.setDate(parseInt(dd));
            // date.setFullYear(parseInt(yyyy));
            // const tsCurr = date.getTime();
            // //console.log('get late approved', tsCurr);
            // if(tsLastUpdated > tsCurr) {
            //   //console.log('late approved', true)
            //   return true;
            // }
            // return false;
        };
        this.updateGraphStats = (arr, arrData, arrPartData, arrLateData, arrComplianceData, partStatus, lateStatus, complianceStatus) => {
            for (var i = 0; i < arr.length; i++) {
                if (arrData == null) {
                    arrData = {};
                }
                const name = arr[i].split(';')[0].trim().replace(/ *\([^)]*\) */g, "");
                if (arrData[name] == null) {
                    arrData[name] = 1;
                }
                else {
                    arrData[name]++;
                }
                if (name.toLowerCase().indexOf('na - corp sec') >= 0) {
                    console.log('arrData[corpsec]', name, arrData[name]);
                }
            }
            for (var i = 0; i < arr.length; i++) {
                if (arrLateData == null) {
                    arrLateData = {};
                }
                if (arrPartData == null) {
                    arrPartData = {};
                }
                if (arrComplianceData == null) {
                    arrComplianceData = {};
                }
                const name = arr[i].split(';')[0].trim().replace(/ *\([^)]*\) */g, "");
                if (arrLateData[name] == null) {
                    arrLateData[name] = {};
                }
                if (arrPartData[name] == null) {
                    arrPartData[name] = {};
                }
                if (arrComplianceData[name] == null) {
                    arrComplianceData[name] = {};
                }
                if (arrPartData[name]["not-started"] == null) {
                    arrPartData[name]["not-started"] = 0;
                }
                if (arrPartData[name]["pending-approval"] == null) {
                    arrPartData[name]["pending-approval"] = 0;
                }
                if (arrPartData[name]["rejected"] == null) {
                    arrPartData[name]["rejected"] = 0;
                }
                if (arrPartData[name]["approved"] == null) {
                    arrPartData[name]["approved"] = 0;
                }
                arrPartData[name][partStatus]++;
                if (arrLateData[name]["late-executed"] == null) {
                    arrLateData[name]["late-executed"] = 0;
                }
                if (arrLateData[name]["late-reported"] == null) {
                    arrLateData[name]["late-reported"] = 0;
                }
                if (arrLateData[name]["late-approved"] == null) {
                    arrLateData[name]["late-approved"] = 0;
                }
                if (arrLateData[name]["past-due-date"] == null) {
                    arrLateData[name]["past-due-date"] = 0;
                }
                if (arrLateData[name]["in-time"] == null) {
                    arrLateData[name]["in-time"] = 0;
                }
                arrLateData[name][lateStatus]++;
                if (arrComplianceData[name]["scheduled"] == null) {
                    arrComplianceData[name]["scheduled"] = 0;
                }
                if (arrComplianceData[name]["not-complied"] == null) {
                    arrComplianceData[name]["not-complied"] = 0;
                }
                if (arrComplianceData[name]["partially-complied"] == null) {
                    arrComplianceData[name]["partially-complied"] = 0;
                }
                if (arrComplianceData[name]["complied"] == null) {
                    arrComplianceData[name]["complied"] = 0;
                }
                arrComplianceData[name][complianceStatus]++;
            }
            return { arrData: arrData, arrPartData: arrPartData, arrLateData: arrLateData, arrComplianceData: arrComplianceData };
        };
        this.updateJurisdictionStats = (jurisdictions, partStatus, lateStatus, complianceStatus) => {
            const result = this.updateGraphStats(jurisdictions, this.jurisdictionData, this.jurisdictionPartStatusData, this.jurisdictionLateStatusData, this.jurisdictionComplianceStatusData, partStatus, lateStatus, complianceStatus);
            this.jurisdictionData = result.arrData;
            this.jurisdictionLateStatusData = result.arrLateData;
            this.jurisdictionPartStatusData = result.arrPartData;
            this.jurisdictionComplianceStatusData = result.arrComplianceData;
        };
        this.updateSubcategoryStats = (subcategories, partStatus, lateStatus, complianceStatus) => {
            const result = this.updateGraphStats(subcategories, this.subcategoryData, this.subcategoryPartStatusData, this.subcategoryLateStatusData, this.subcategoryComplianceStatusData, partStatus, lateStatus, complianceStatus);
            this.subcategoryData = result.arrData;
            this.subcategoryLateStatusData = result.arrLateData;
            this.subcategoryPartStatusData = result.arrPartData;
            this.subcategoryComplianceStatusData = result.arrComplianceData;
        };
        this.updateFrequencyStats = (frequencies, partStatus, lateStatus, complianceStatus) => {
            const result = this.updateGraphStats(frequencies, this.frequencyData, this.frequencyPartStatusData, this.frequencyLateStatusData, this.frequencyComplianceStatusData, partStatus, lateStatus, complianceStatus);
            this.frequencyData = result.arrData;
            this.frequencyLateStatusData = result.arrLateData;
            this.frequencyPartStatusData = result.arrPartData;
            this.frequencyComplianceStatusData = result.arrComplianceData;
        };
        this.updateLocationStats = (location, partStatus, lateStatus, complianceStatus) => {
            //console.log('location', location);
            if (this.locationData == null) {
                this.locationData = {};
            }
            const locationName = location.replace(/ *\([^)]*\) */g, "");
            if (this.locationData[locationName] == null) {
                this.locationData[locationName] = 1;
            }
            else {
                this.locationData[locationName]++;
            }
            if (this.locationLateStatusData == null) {
                this.locationLateStatusData = {};
            }
            if (this.locationPartStatusData == null) {
                this.locationPartStatusData = {};
            }
            if (this.locationComplianceStatusData == null) {
                this.locationComplianceStatusData = {};
            }
            if (this.locationLateStatusData[locationName] == null) {
                this.locationLateStatusData[locationName] = {};
            }
            if (this.locationPartStatusData[locationName] == null) {
                this.locationPartStatusData[locationName] = {};
            }
            if (this.locationComplianceStatusData[locationName] == null) {
                this.locationComplianceStatusData[locationName] = {};
            }
            if (this.locationPartStatusData[locationName]["not-started"] == null) {
                this.locationPartStatusData[locationName]["not-started"] = 0;
            }
            if (this.locationPartStatusData[locationName]["pending-approval"] == null) {
                this.locationPartStatusData[locationName]["pending-approval"] = 0;
            }
            if (this.locationPartStatusData[locationName]["rejected"] == null) {
                this.locationPartStatusData[locationName]["rejected"] = 0;
            }
            if (this.locationPartStatusData[locationName]["approved"] == null) {
                this.locationPartStatusData[locationName]["approved"] = 0;
            }
            this.locationPartStatusData[locationName][partStatus]++;
            if (this.locationLateStatusData[locationName]["late-reported"] == null) {
                this.locationLateStatusData[locationName]["late-reported"] = 0;
            }
            if (this.locationLateStatusData[locationName]["late-executed"] == null) {
                this.locationLateStatusData[locationName]["late-executed"] = 0;
            }
            if (this.locationLateStatusData[locationName]["late-approved"] == null) {
                this.locationLateStatusData[locationName]["late-approved"] = 0;
            }
            if (this.locationLateStatusData[locationName]["past-due-date"] == null) {
                this.locationLateStatusData[locationName]["past-due-date"] = 0;
            }
            if (this.locationLateStatusData[locationName]["in-time"] == null) {
                this.locationLateStatusData[locationName]["in-time"] = 0;
            }
            this.locationLateStatusData[locationName][lateStatus]++;
            if (this.locationComplianceStatusData[locationName]["not-complied"] == null) {
                this.locationComplianceStatusData[locationName]["not-complied"] = 0;
            }
            if (this.locationComplianceStatusData[locationName]["complied"] == null) {
                this.locationComplianceStatusData[locationName]["complied"] = 0;
            }
            if (this.locationComplianceStatusData[locationName]["partially-complied"] == null) {
                this.locationComplianceStatusData[locationName]["partially-complied"] = 0;
            }
            if (this.locationComplianceStatusData[locationName]["scheduled"] == null) {
                this.locationComplianceStatusData[locationName]["scheduled"] = 0;
            }
            this.locationComplianceStatusData[locationName][complianceStatus]++;
        };
        this.updateFunctionStats = (functions, partStatus, lateStatus, complianceStatus) => {
            const result = this.updateGraphStats(functions, this.functionData, this.functionPartStatusData, this.functionLateStatusData, this.functionComplianceStatusData, partStatus, lateStatus, complianceStatus);
            this.functionData = result.arrData;
            this.functionLateStatusData = result.arrLateData;
            this.functionPartStatusData = result.arrPartData;
            this.functionComplianceStatusData = result.arrComplianceData;
        };
        this.updateRiskAreaStats = (riskAreas, partStatus, lateStatus, complianceStatus) => {
            const result = this.updateGraphStats(riskAreas, this.riskAreasData, this.riskAreasPartStatusData, this.riskAreasLateStatusData, this.riskAreasComplianceStatusData, partStatus, lateStatus, complianceStatus);
            this.riskAreasData = result.arrData;
            this.riskAreasLateStatusData = result.arrLateData;
            this.riskAreasPartStatusData = result.arrPartData;
            this.riskAreasComplianceStatusData = result.arrComplianceData;
        };
        this.updateRiskSeverityStats = (riskSeverities, partStatus, lateStatus, complianceStatus) => {
            //console.log('updateRiskSeverityStats', riskSeverities, complianceStatus)
            const result = this.updateGraphStats(riskSeverities, this.riskSeverityData, this.riskSeverityPartStatusData, this.riskSeverityLateStatusData, this.riskSeverityComplianceStatusData, partStatus, lateStatus, complianceStatus);
            this.riskSeverityData = result.arrData;
            this.riskSeverityLateStatusData = result.arrLateData;
            this.riskSeverityPartStatusData = result.arrPartData;
            this.riskSeverityComplianceStatusData = result.arrComplianceData;
            //console.log('updateRiskSeverityStats', JSON.stringify(result.arrComplianceData))
        };
        this.updateObligationTypeStats = (obligationTypes, partStatus, lateStatus, complianceStatus) => {
            const result = this.updateGraphStats(obligationTypes, this.obligationTypeData, this.obligationTypePartStatusData, this.obligationTypeLateStatusData, this.obligationTypeComplianceStatusData, partStatus, lateStatus, complianceStatus);
            this.obligationTypeData = result.arrData;
            this.obligationTypeLateStatusData = result.arrLateData;
            this.obligationTypePartStatusData = result.arrPartData;
            this.obligationTypeComplianceStatusData = result.arrComplianceData;
            //console.log('Updating obligationtype stats', this.obligationTypeLateStatusData);
        };
        this.getReporterStringFromEvent = (event) => {
            let reporterStr = '';
            for (var k = 0; k < event.reporters.length; k++) {
                reporterStr += '<div part="badge-reporter-name" class="graphparamname graphparamname2 mb-20 ml-10">' + (event.reporters[k].split(';')[0]) + '</div>';
            }
            return reporterStr;
        };
        this.getReporterDetailStringFromEvent = (event) => {
            let reporterStr = '';
            for (var k = 0; k < event.reporters.length; k++) {
                reporterStr += '<div part="detail-reporter-name" class="graphparamname mb-20 mr-10">' + (event.reporters[k].split(';')[0]) + '</div>';
            }
            return reporterStr;
        };
        this.getApproverStringFromEvent = (event) => {
            let approverStr = '';
            for (var k = 0; k < event.approvers.length; k++) {
                approverStr += '<div part="badge-approver-name" class="graphparamname graphparamname3 mb-20 ml-10">' + (event.approvers[k].split(';')[0]) + '</div>';
            }
            return approverStr;
        };
        this.getApproverDetailStringFromEvent = (event) => {
            let approverStr = '';
            for (var k = 0; k < event.approvers.length; k++) {
                approverStr += '<div part="detail-approver-name" class="graphparamname mb-20 mr-10">' + (event.approvers[k].split(';')[0]) + '</div>';
            }
            return approverStr;
        };
        this.renderLatestCompliance = (mmddyyyy, event) => {
            var lastMax = 0;
            for (var k = 0; k < event.compliances.length; k++) {
                const tsOfEvent = new Date(mmddyyyy).getTime();
                const tsOfCompliance = parseInt(event.compliances[k].complianceid.S);
                if (tsOfCompliance > lastMax && tsOfCompliance <= tsOfEvent) {
                    event['specificity'] = JSON.parse(event.compliances[k].data.S)['specificity'];
                    event['reference'] = JSON.parse(event.compliances[k].data.S)['reference'];
                    event['obligation'] = JSON.parse(event.compliances[k].data.S)['obligation'];
                    event['penalty'] = JSON.parse(event.compliances[k].data.S)['penalty'];
                    event['authority'] = JSON.parse(event.compliances[k].data.S)['authority'];
                    event['frequency'] = JSON.parse(event.compliances[k].data.S)['frequency'];
                    event['obligationtype'] = JSON.parse(event.compliances[k].data.S)['obligationtype'];
                    event['duedate'] = JSON.parse(event.compliances[k].data.S)['duedate'];
                    event['applicability'] = JSON.parse(event.compliances[k].data.S)['applicability'];
                    event['form'] = JSON.parse(event.compliances[k].data.S)['form'];
                    event['internalcontrols'] = JSON.parse(event.compliances[k].data.S)['internalcontrols'];
                    event['firstlineofdefence'] = JSON.parse(event.compliances[k].data.S)['firstlineofdefence'];
                    event['risk'] = JSON.parse(event.compliances[k].data.S)['risk'];
                    event['riskarea'] = JSON.parse(event.compliances[k].data.S)['riskarea'];
                }
            }
            return event;
        };
        this.getCompletenessStatus = (event) => {
            //console.log(event);
            if (event.comments == null || event.comments.length === 0) {
                return "not-started";
            }
            else {
                if (event.approved != null && event.approved) {
                    return "approved";
                }
                else {
                    if (event.comments[event.comments.length - 1].author == "Reporter") {
                        return "pending-approval";
                    }
                    else {
                        return "rejected";
                    }
                }
            }
        };
        this.getTimelinessStatus = (mmdd, event, completeness) => {
            if (completeness == "not-started") {
                if (this.getPastDueDate(mmdd)) {
                    return "past-due-date";
                }
                else {
                    return "in-time";
                }
            }
            else if (completeness == "pending-approval" || completeness == "rejected") {
                if (this.getLateExecuted(mmdd, event)) {
                    return "late-executed";
                }
                else if (this.getLateReported(mmdd, event)) {
                    return "late-reported";
                }
                else if (this.getPastDueDate(mmdd)) {
                    return "past-due-date";
                }
                else {
                    return "in-time";
                }
            }
            else {
                if (this.getLateExecuted(mmdd, event)) {
                    return "late-executed";
                }
                else if (this.getLateReported(mmdd, event)) {
                    return "late-reported";
                }
                else if (this.getLateApproved(mmdd, event)) {
                    return "late-approved";
                }
                else {
                    return "in-time";
                }
            }
        };
        this.getComplianceStatus = (completeness, timeliness) => {
            if (completeness == "not-started") {
                if (timeliness == "in-time") {
                    return "scheduled";
                }
                else {
                    return "not-complied";
                }
            }
            else if (completeness == "pending-approval") {
                if (timeliness == "in-time") {
                    return "scheduled";
                }
                else if (timeliness == "past-due-date" || timeliness == "late-executed") {
                    return "not-complied";
                }
                else {
                    return "partially-complied";
                }
            }
            else if (completeness == "rejected") {
                if (timeliness == "in-time") {
                    return "scheduled";
                }
                else {
                    return "not-complied";
                }
            }
            else {
                if (timeliness == "in-time" || timeliness == "late-reported" || timeliness == "late-approved") {
                    return "complied";
                }
                else {
                    return "not-complied";
                }
            }
        };
        this.numcalled = 0;
        this.updateStats = (event, partStatus, lateStatus, complianceStatus) => {
            this.updateRiskAreaStats(event['riskarea'], partStatus, lateStatus, complianceStatus);
            this.updateRiskSeverityStats(event['risk'], partStatus, lateStatus, complianceStatus);
            this.updateFunctionStats(event['functions'], partStatus, lateStatus, complianceStatus);
            this.updateObligationTypeStats(event['obligationtype'], partStatus, lateStatus, complianceStatus);
            this.updateJurisdictionStats(event['jurisdiction'], partStatus, lateStatus, complianceStatus);
            this.updateFrequencyStats(event['frequency'], partStatus, lateStatus, complianceStatus);
            //console.log('updateLocationStats', event['locationname'], event.duedate, event.id);
            this.updateLocationStats(event['locationname'], partStatus, lateStatus, complianceStatus);
            this.updateSubcategoryStats(event['subcategory'], partStatus, lateStatus, complianceStatus);
        };
        this.renderCalendarGraphs = (showGraph) => {
            //console.log('flowGraph', this.flowGraph);
            var html = '';
            html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
            if (showGraph) {
                html += '<div part="stream-event-chart-selection" class="mb-20">';
                html += '<div part="td-head" class="mb-5">Select Chart</div>';
                html += '<div class="mb-10 d-flex flex-wrap align-center">';
                html += '<div part="chart-radio-item"><input type="radio" id="radio-compliance" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) ? 'checked' : '') + '>';
                html += '<label for="radio-compliance" part="input-label" class="mr-10">Compliance</label></div>';
                html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') + '>';
                html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
                html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') + '>';
                html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_RISKAREAS ? '' : 'hide') + '"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') + '>';
                html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY ? '' : 'hide') + '"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') + '>';
                html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_LOCATION ? '' : 'hide') + '"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') + '>';
                html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_FUNCTION ? '' : 'hide') + '"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') + '>';
                html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE ? '' : 'hide') + '"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') + '>';
                html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_JURISDICTION ? '' : 'hide') + '"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') + '>';
                html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_FREQUENCY ? '' : 'hide') + '"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') + '>';
                html += '<label for="radio-frequency" part="input-label" class="mr-10">Frequency</label></div>';
                html += '<div part="chart-radio-item" class="chart-radio-item-secondary ' + (this.flowGraph == this.FLOW_GRAPH_SUBCATEGORY ? '' : 'hide') + '"><input type="radio" id="radio-subcategory" name="graph-type" part="radio-graph" ' + ((this.flowGraph == this.FLOW_GRAPH_SUBCATEGORY) ? 'checked' : '') + '>';
                html += '<label for="radio-frequency" part="input-label">SubCategory</label></div>';
                html += '<button id="graph-radios-expander" class="ml-10" part="calendar-tab-button-not-selected"><span class="material-symbols-outlined">chevron_right</span></button>';
                html += '</div>';
                html += '</div>';
                html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart4" class="gone"></canvas></div><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></canvas></div></div>';
                html += '<div id="chart-settings-controls" class="mt-20"></div>';
                html += '<div id="chart-settings"></div>';
            }
            else {
                html += '<div part="box" class="box"></div>';
            }
            html += '</div>';
            return html;
        };
        this.renderCalendarContainerDivStart = (index) => {
            var html = '';
            html += '<div id="stream-event-' + index + '" part="stream-event-list" class="stream-event-list">';
            return html;
        };
        this.renderCalendarContainerDivEnd = () => {
            var html = '';
            html += '</div>';
            return html;
        };
        this.renderCalendarEventSummary = () => {
            var html = '';
            html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
            html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span>&nbsp;<span id="graph-total">DASHBOARD_TOTAL</span></div>';
            html += '<div part="badge-dashboard" id="chip-completeness-0" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span>&nbsp;<span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
            html += '<div part="badge-dashboard" id="chip-completeness-1" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>Pending Approval:</span>&nbsp;<span id="graph-pending-approval">DASHBOARD_PENDING_APPROVAL</span></div>';
            html += '<div part="badge-dashboard" id="chip-completeness-2" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-rejected">block</span>&nbsp;&nbsp;<span>Rejected:</span>&nbsp;<span id="graph-rejected">DASHBOARD_REJECTED</span></div>';
            html += '<div part="badge-dashboard" id="chip-completeness-3" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span>&nbsp;<span id="graph-approved">DASHBOARD_APPROVED</span></div>';
            html += '<div part="badge-dashboard" id="chip-timeliness-0" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-in-time">schedule</span>&nbsp;&nbsp;<span>In Time:</span>&nbsp;<span id="graph-in-time">DASHBOARD_IN_TIME</span></div>';
            html += '<div part="badge-dashboard" id="chip-timeliness-1" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-past-due-date">timer</span>&nbsp;&nbsp;<span>Past Due Date:</span>&nbsp;<span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
            html += '<div part="badge-dashboard" id="chip-timeliness-2" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-reported">report_off</span>&nbsp;&nbsp;<span>Late Reported:</span>&nbsp;<span id="graph-late-reported">DASHBOARD_LATE_REPORTED</span></div>';
            html += '<div part="badge-dashboard" id="chip-timeliness-3" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-approved">remove_done</span>&nbsp;&nbsp;<span>Late Approved:</span>&nbsp;<span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
            html += '<div part="badge-dashboard" id="chip-timeliness-4" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span>&nbsp;<span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
            html += '<div part="badge-dashboard" id="chip-compliance-0" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-icons color-scheduled">schedule</span>&nbsp;&nbsp;<span>Scheduled:</span>&nbsp;<span id="graph-scheduled">DASHBOARD_SCHEDULED</span></div>';
            html += '<div part="badge-dashboard" id="chip-compliance-1" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-icons color-not-complied">disabled_by_default</span>&nbsp;&nbsp;<span>Not Complied:</span>&nbsp;<span id="graph-not-complied">DASHBOARD_NOT_COMPLIED</span></div>';
            html += '<div part="badge-dashboard" id="chip-compliance-2" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-icons color-partially-complied">rule</span>&nbsp;&nbsp;<span>Partially Complied:</span>&nbsp;<span id="graph-partially-complied">DASHBOARD_PARTIALLY_COMPLIED</span></div>';
            html += '<div part="badge-dashboard" id="chip-compliance-3" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-symbols-outlined color-complied">sweep</span>&nbsp;&nbsp;<span>Complied:</span>&nbsp;<span id="graph-complied">DASHBOARD_COMPLIED</span></div>';
            html += '</div>';
            html += '<div id="stream-event-filter" part="stream-event-total" class="d-flex flex-wrap"></div>';
            return html;
        };
        this.getCalendarRowHide = (events, i, lastDay, month, firstDate = null, currDate = null) => {
            var hide = true;
            if (events != null) {
                hide = false;
            }
            else if (i === 1) {
                hide = false;
            }
            else if (i === lastDay) {
                hide = false;
            }
            else {
                if (firstDate == null) {
                    const mmddPrev = ("0" + (month + 1)).slice(-2) + "/" + ("0" + (i - 1)).slice(-2);
                    const mmddNext = ("0" + (month + 1)).slice(-2) + "/" + ("0" + (i + 1)).slice(-2);
                    //console.log('hide', i, hide);
                    if ((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
                        hide = false;
                    }
                }
                else {
                    const startNextDate = new Date(currDate.getTime());
                    startNextDate.setDate(currDate.getDate() + 1);
                    const startPrevDate = new Date(currDate.getTime());
                    startPrevDate.setDate(currDate.getDate() - 1);
                    const mmddNext = ("0" + (startNextDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
                    const mmddPrev = ("0" + (startPrevDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
                    //console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
                    if ((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
                        hide = false;
                    }
                }
            }
            return hide;
        };
        this.renderCalendarRowDivStart = (i, firstDate = null, ddmm = "") => {
            var html = '';
            html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
            html += '<div part="stream-event-selected-date">' + (firstDate != null ? ddmm : ("0" + i).slice(-2)) + ' |</div>';
            html += '<div class="stream-event-list-container flex-grow">';
            return html;
        };
        this.renderCalendarRowDivEnd = () => {
            var html = '';
            html += '</div>';
            html += '</div>';
            return html;
        };
        this.renderCalendarRowDivItemDivStart = (mmdd, event, itemNumber, partStatus) => {
            var html = '';
            var remarks = "";
            var occurrenceDate = "";
            const arrMmdd = mmdd.split("/");
            const ddmm = arrMmdd[1] + "/" + arrMmdd[0];
            if (event.triggers.length > 0 && event.triggers != "[]") {
                const arrTriggers = JSON.parse(event.triggers);
                for (var i = 0; i < arrTriggers.length; i++) {
                    const targetDates = arrTriggers[i].targetDates;
                    for (var j = 0; j < targetDates.length; j++) {
                        console.log('comparing', targetDates[j], ddmm);
                        if (targetDates[j].indexOf(ddmm) >= 0) {
                            remarks = arrTriggers[i].remarks;
                            occurrenceDate = arrTriggers[i].occurrenceDate;
                            console.log('remarks', mmdd);
                        }
                    }
                }
            }
            let lastUpdated = '';
            console.log('lastUpdated', event.lastupdated);
            if (event.lastupdated != null && event.lastupdated.length > 0) {
                lastUpdated = event.lastupdated;
            }
            html += '<div class="stream-events-container flex-grow">';
            html += '<div class="hidden-tags hide">' + JSON.stringify(event['tags']) + '</div>';
            html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>not filtered</i></th></thead></table></div>';
            html += '<div part="stream-events-event-title" class="stream-events-event-title d-flex align-center pl-5 pb-5">' + ('<input id="button-select-' + mmdd.replace('/', '-') + '-' + itemNumber + '-' + (((event.makercheckers != null && (event.makercheckers).length > 0)) ? '1' : '0') + '-' + (((event.docs != null && (event.docs).length > 0)) ? '1' : '0') + '-' + event.entityid.replace(/-/g, '_') + '-' + event.locationid.replace(/-/g, '_') + '-' + event.id.replace(/-/g, '_') + '-' + event.duedate.split('/')[1] + '-' + event.duedate.split('/')[0] + '-' + event.duedate.split('/')[2] + '-' + partStatus.replace(/-/g, '_') + '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="' + event['obligationtitle'] + '" minLength="100"></sf-i-elastic-text>' + (lastUpdated.length > 0 ? ('&nbsp;&nbsp;<div part="event-last-updated-time" class="d-flex align-center">' + lastUpdated + '</div>') : "") + '</div>';
            if (remarks.length > 0) {
                html += '<div part="stream-events-event-subtitle" class="stream-events-event-subtitle">' + remarks + ', occurred on ' + occurrenceDate + '</div>';
            }
            return html;
        };
        this.renderCalendarRowDivItemDivEnd = () => {
            var html = '';
            html += '</div>';
            return html;
        };
        this.renderCalendarBlankRowDiv = (hide, slice, i, firstDate = null, ddmm = "") => {
            var html = '';
            //console.log('hidedecision', ddmm, hide);
            if (!hide) {
                html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
                html += '<div>' + (firstDate != null ? ddmm : ("0" + i).slice(-2)) + '</div>';
                html += '</div>';
                slice = 2;
            }
            else {
                if (i % slice === 0) {
                    html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
                    //html += '<div>'+("0" + i).slice(-2)+' |</div>';
                    html += '<div>.</div>';
                    html += '</div>';
                    slice += 3;
                }
            }
            return { html: html, slice: slice };
        };
        this.renderCalendarRowDivItemDivTableHead = (event, partStatus) => {
            var html = '';
            html += '<table class="stream-events-container-table" part="' + partStatus + '">';
            html += '<thead>';
            html += '<th part="td-head">';
            html += 'Open';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Status';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Location';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Entity';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Country';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Function';
            html += '</th>';
            for (var k = 0; k < Object.keys(event).length; k++) {
                if (this.getEventPreviewFields().includes(Object.keys(event)[k])) {
                    html += '<th part="td-head" class="bg-left-no-border">';
                    html += Object.keys(event)[k];
                }
            }
            //console.log('listing docs',event.documents )
            if (event.documents != null && (event.documents).length > 0) {
                html += '<th part="td-head">';
                html += 'Docs';
                html += '</th>';
            }
            if (event.comments != null && (event.comments).length > 0) {
                html += '<th part="td-head">';
                html += 'Comments';
                html += '</th>';
            }
            if (event.lastupdated != null && (event.lastupdated).length > 0) {
                html += '<th part="td-head">';
                html += 'Updated';
                html += '</th>';
            }
            if (event.makercheckers != null && (event.makercheckers).length > 0) {
                html += '<th part="td-head">';
                html += '';
                html += '</th>';
            }
            if (event.docs != null && (event.docs).length > 0) {
                html += '<th part="td-head">';
                html += '';
                html += '</th>';
            }
            html += '</thead>';
            return html;
        };
        this.renderCalendarRowDivItemDivTableBody = (event, partStatus, lateStatus, complianceStatus, mmdd, i, j) => {
            var html = '';
            html += '<tbody>';
            html += '<td id="td-expand-' + i + '" part="td-body">';
            html += '<button id="button-unmapped-expand-' + mmdd.replace('/', '-') + '-' + j + '" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>';
            html += '</td>';
            html += '<td part="td-body">';
            html += this.renderStatusHtml(partStatus, lateStatus, complianceStatus, i);
            html += '</td>';
            html += '<td part="td-body"><sf-i-elastic-text text="' + event["locationname"].replace(/ *\([^)]*\) */g, "") + '" minLength="10"></sf-i-elastic-text></td>';
            html += '<td part="td-body"><sf-i-elastic-text text="' + event["entityname"].replace(/ *\([^)]*\) */g, "") + '" minLength="10"></sf-i-elastic-text></td>';
            html += '<td part="td-body"><sf-i-elastic-text text="' + event["countryname"].replace(/ *\([^)]*\) */g, "") + '" minLength="10"></sf-i-elastic-text></td>';
            var functions = '';
            for (const element of event["functions"]) {
                functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
            }
            functions = functions.replace(/,\s*$/, "");
            html += '<td part="td-body"><sf-i-elastic-text text="' + functions + '" minLength="10"></sf-i-elastic-text></td>';
            for (var k = 0; k < Object.keys(event).length; k++) {
                if (this.getEventPreviewFields().includes(Object.keys(event)[k])) {
                    html += '<td part="td-body">';
                    if (event[Object.keys(event)[k]].indexOf("[") >= 0) {
                        html += this.getEventTexts(Object.keys(event)[k], JSON.parse(event[Object.keys(event)[k]]), event);
                    }
                    else {
                        html += ' <sf-i-elastic-text text="' + event[Object.keys(event)[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                    }
                    html += '</td>';
                }
            }
            if (event.documents != null && event.documents != null && (event.documents).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">description</span>';
                html += (event.documents).length;
                html += '</td>';
            }
            if (event.comments != null && event.comments != null && (event.comments).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">forum</span>';
                html += (event.comments).length;
                html += '</td>';
            }
            if (event.lastupdated != null && event.lastupdated != null && (event.lastupdated).length > 0) {
                html += '<td part="td-body">';
                html += Util.timeSince(new Date(event.lastupdated).getTime());
                html += '</td>';
            }
            if (event.makercheckers != null && (event.makercheckers).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-symbols-outlined muted">done_all</span>';
                html += '</td>';
            }
            if (event.docs != null && (event.docs).length > 0) {
                html += '<th part="td-body">';
                html += '<span class="material-symbols-outlined muted">scan_delete</span>';
                html += '</th>';
            }
            html += '</tbody>';
            html += '</table>';
            return html;
        };
        this.renderStatusHtml = (partStatus, lateStatus, complianceStatus, i) => {
            var html = '';
            html += (complianceStatus == "scheduled" ? '<span class="material-symbols-outlined color-scheduled color-scheduled-item color-scheduled-item-' + i + '">schedule</span>' : '');
            html += (complianceStatus == "not-complied" ? '<span class="material-symbols-outlined color-not-complied color-not-complied-item color-not-complied-item-' + i + '">disabled_by_default</span>' : '');
            html += (complianceStatus == "partially-complied" ? '<span class="material-symbols-outlined color-partially-complied color-partially-complied-item color-partially-complied-item-' + i + '">rule</span>' : '');
            html += (complianceStatus == "complied" ? '<span class="material-symbols-outlined color-complied color-complied-item color-complied-item-' + i + '">sweep</span>' : '');
            html += (partStatus == "not-started" ? '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-' + i + '">schedule</span>' : '');
            html += (partStatus == "pending-approval" ? '<span class="material-symbols-outlined color-pending color-pending-item color-pending-item-' + i + '">pending</span>' : '');
            html += (partStatus == "rejected" ? '<span class="material-symbols-outlined color-rejected color-rejected-item color-rejected-item-' + i + '">block</span>' : '');
            html += (partStatus == "approved" ? '<span class="material-symbols-outlined color-done color-done-item color-done-item-' + i + '">check_circle</span>' : '');
            html += (lateStatus == "in-time" ? '<span class="material-symbols-outlined color-in-time color-in-time-item color-in-time-item-' + i + '">schedule</span>' : '');
            html += (lateStatus == "past-due-date" ? '<span class="material-symbols-outlined color-past-due-date color-past-due-date-item color-past-due-date-item-' + i + '">timer</span>' : '');
            html += (lateStatus == "late-reported" ? '<span class="material-symbols-outlined color-late-reported color-late-reported-item color-late-reported-item-' + i + '">report_off</span>' : '');
            html += (lateStatus == "late-approved" ? '<span class="material-symbols-outlined color-late-approved color-late-approved-item color-late-approved-item-' + i + '">remove_done</span>' : '');
            html += (lateStatus == "late-executed" ? '<span class="material-symbols-outlined color-late-executed color-late-executed-item color-late-executed-item-' + i + '">running_with_errors</span>' : '');
            html.trim().replace(/ \s*$/, "");
            return html;
        };
        this.renderStatusString = (partStatus, lateStatus, complianceStatus) => {
            var str = '';
            str += (partStatus == "not-started" ? 'not-started ' : '');
            str += (partStatus == "pending-approval" ? 'pending-approval ' : '');
            str += (partStatus == "rejected" ? 'rejected ' : '');
            str += (partStatus == "approved" ? 'approved ' : '');
            str += (lateStatus == "in-time" ? 'in-time ' : '');
            str += (lateStatus == "past-due-date" ? 'past-due-date ' : '');
            str += (lateStatus == "late-reported" ? 'late-reported ' : '');
            str += (lateStatus == "late-approved" ? 'late-approved ' : '');
            str += (lateStatus == "late-executed" ? 'late-executed ' : '');
            str += (complianceStatus == "scheduled" ? 'scheduled ' : '');
            str += (complianceStatus == "complied" ? 'complied ' : '');
            str += (complianceStatus == "not-complied" ? 'not-complied ' : '');
            str += (complianceStatus == "partially-complied" ? 'partially-complied ' : '');
            return str.trim();
        };
        this.getGraphParam = (event) => {
            let graphParam = '';
            //console.log('getGraphParam', this.flowGraph, event);
            if (Array.isArray(event[this.flowGraph])) {
                graphParam = event[this.flowGraph].toString().replace(/ *\([^)]*\) */g, "").replace(/,/g, ' • ');
            }
            else {
                graphParam = event[this.flowGraph].replace(/ *\([^)]*\) */g, "").replace(/,/g, ' • ');
            }
            return graphParam;
        };
        this.renderCalendarAnnotations = (event) => {
            var html = '';
            html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>';
            let reporterStr = this.getReporterStringFromEvent(event);
            let approverStr = this.getApproverStringFromEvent(event);
            let graphParam = this.getGraphParam(event);
            html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + graphParam.split(';')[0] + '</div>' + reporterStr + approverStr + '</div>';
            return html;
        };
        this.renderEvents = (_firstDay, _endDay, iInit, iLast, showGraph, index, month, period, firstDate = null) => {
            var total = 0, notStarted = 0, approved = 0, pendingApproval = 0, rejected = 0, inTime = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0, lateReported = 0, scheduled = 0, partiallyComplied = 0, notComplied = 0, complied = 0;
            var html = '';
            this.selectedItems = [];
            this.selectedStatus = "";
            var csvCols = "", htmlCols = "";
            var csvValues = "", htmlValues = "";
            var slice = 2;
            this.eventsInWindow = [];
            var lastDay = iLast;
            this.clearGraphData();
            this.clearSelectedGraphParam();
            this.clearSelectedLegend();
            html += this.renderCalendarGraphs(showGraph);
            html += this.renderCalendarContainerDivStart(index);
            html += this.renderCalendarEventSummary();
            // csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
            csvCols += 'Id,Country,State,Jurisdiction,Category,Subcategory,Statute,Reference,Applicability,ObligationType,ObligationTitle,Obligation,Firstlineofdefence,Secondlineofdefence,Thirdlineofdefence,Internalcontrols,Penalty,Form,AdditionalUrl,Definition,Authority,RiskSeverity,RiskAreas,Frequency,SubFrequency,DueDate,Status,ReportParameter';
            htmlCols += '<tr><th class="td-thin">Id</th><th class="td-thin">Country</th><th class="td-thin">State</th><th class="td-thin">Jurisdiction</th><th class="td-thin">Category</th><th class="td-thin">Subcategory</th><th class="td-wide">Statute</th><th class="td-thin">Reference</th><th class="td-thin">Applicability</th><th class="td-thin">ObligationType</th><th class="td-wide">ObligationTitle</th><th class="td-wide">Obligation</th><th class="td-thin">Firstlineofdefence</th><th class="td-thin">Secondlineofdefence</th><th class="td-thin">Thirdlineofdefence</th><th>InternalControls</th><th class="td-wide">Penalty</th><th class="td-thin">Form</th><th class="td-thin">Additional URL</th><th class="td-thin">Definition</th><th class="td-thin">Authority</th><th class="td-thin">RiskSeverity</th><th class="td-wide">RiskAreas</th><th class="td-thin">Frequency</th><th class="td-thin">SubFrequency</th><th class="td-thin">DueDate</th><th class="td-wide">Status</th><th class="td-wide">ReportParameter</th></tr>';
            for (var i = iInit; i <= iLast; i++) {
                let mmdd = "";
                if (firstDate == null) {
                    mmdd = ("0" + (month + 1)).slice(-2) + "/" + ("0" + i).slice(-2);
                }
                else {
                    const currDate = new Date(firstDate.getTime());
                    currDate.setDate(firstDate.getDate() + (i - 1));
                    mmdd = ("0" + (currDate.getMonth() + 1)).slice(-2) + "/" + ("0" + currDate.getDate()).slice(-2);
                }
                //console.log('mmdd', mmdd);
                //console.log('mmddevent', mmdd,this.events[mmdd]);
                var hide;
                if (firstDate == null) {
                    hide = this.getCalendarRowHide(this.events[mmdd], i, lastDay, month, firstDate, null);
                }
                else {
                    const currDate = new Date(firstDate.getTime());
                    currDate.setDate(firstDate.getDate() + (i - 1));
                    hide = this.getCalendarRowHide(this.events[mmdd], i, lastDay, month, firstDate, currDate);
                }
                if (this.events[mmdd] != null) {
                    html += this.renderCalendarRowDivStart(i, firstDate, mmdd.split("/")[1] + "/" + mmdd.split("/")[0]);
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        this.events[mmdd][j]['mmdd'] = mmdd;
                        this.eventsInWindow.push(this.events[mmdd][j]);
                        var partStatus = "";
                        var lateStatus = "";
                        var complianceStatus = "";
                        // const tempEvents1 = JSON.parse(JSON.stringify(this.events));
                        // //console.log('eventlog1', tempEvents1['06/30'][7].comments, mmdd, j);
                        partStatus = this.getCompletenessStatus(JSON.parse(JSON.stringify(this.events[mmdd][j])));
                        lateStatus = this.getTimelinessStatus(mmdd, JSON.parse(JSON.stringify(this.events[mmdd][j])), partStatus);
                        complianceStatus = this.getComplianceStatus(partStatus, lateStatus);
                        // const tempEvents2 = JSON.parse(JSON.stringify(this.events));
                        // //console.log('eventlog2', tempEvents2['06/30'][7].comments, mmdd, j);
                        notStarted = notStarted + (partStatus == "not-started" ? 1 : 0);
                        pendingApproval = pendingApproval + (partStatus == "pending-approval" ? 1 : 0);
                        rejected = rejected + (partStatus == "rejected" ? 1 : 0);
                        approved = approved + (partStatus == "approved" ? 1 : 0);
                        inTime = inTime + (lateStatus == "in-time" ? 1 : 0);
                        pastDueDate = pastDueDate + (lateStatus == "past-due-date" ? 1 : 0);
                        lateReported = lateReported + (lateStatus == "late-reported" ? 1 : 0);
                        lateApproved = lateApproved + (lateStatus == "late-approved" ? 1 : 0);
                        lateExecuted = lateExecuted + (lateStatus == "late-executed" ? 1 : 0);
                        scheduled = scheduled + (complianceStatus == "scheduled" ? 1 : 0);
                        partiallyComplied = partiallyComplied + (complianceStatus == "partially-complied" ? 1 : 0);
                        notComplied = notComplied + (complianceStatus == "not-complied" ? 1 : 0);
                        complied = complied + (complianceStatus == "complied" ? 1 : 0);
                        this.events[mmdd][j][this.FLOW_GRAPH_COMPLETENESS] = partStatus;
                        this.events[mmdd][j][this.FLOW_GRAPH_TIMELINESS] = lateStatus;
                        this.events[mmdd][j][this.FLOW_GRAPH_COMPLIANCE] = complianceStatus;
                        if (this.events[mmdd][j].id == "362e0260-b0bf-41f9-9788-a7f680de1c3b") {
                            //console.log('commentsinlist 1', JSON.stringify(this.events[mmdd][j].comments), mmdd, j)
                        }
                        this.updateStats(this.events[mmdd][j], partStatus, lateStatus, complianceStatus);
                        csvValues += ('"' + (this.events[mmdd][j]["id"] + '",'));
                        csvValues += ('"' + (this.events[mmdd][j]["country"] + '",'));
                        csvValues += ('"' + (this.events[mmdd][j]["state"] + '",'));
                        csvValues += ('"' + (this.events[mmdd][j]["jurisdiction"] + '",'));
                        csvValues += ('"' + (this.events[mmdd][j]["category"] + '",'));
                        csvValues += ('"' + (this.events[mmdd][j]["subcategory"] + '",'));
                        csvValues += ('"' + (this.events[mmdd][j]["statute"] + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["reference"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["applicability"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["obligationtype"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["obligationtitle"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["obligation"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["firstlineofdefence"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["secondlineofdefence"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["thirdlineofdefence"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["internalcontrols"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["penalty"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["form"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["additionalurls"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["definition"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["authority"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["risk"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["riskarea"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["frequency"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["subfrequency"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + ((this.events[mmdd][j]["duedate"] + "").replace(/"/g, "") + '",'));
                        csvValues += ('"' + (this.renderStatusString(partStatus, lateStatus, complianceStatus) + '",'));
                        csvValues += ('"' + (this.getGraphParam(this.events[mmdd][j]) + '"\n'));
                        // csvValues += (period + ',' 
                        //   + this.renderStatusString(partStatus, lateStatus, complianceStatus) + ',' 
                        //   + this.events[mmdd][j]["id"] + ',' 
                        //   + this.events[mmdd][j]["obligationtitle"] + ',' 
                        //   + this.events[mmdd][j]["obligation"] + ',' 
                        //   + this.events[mmdd][j]["duedate"]
                        //   + '\n');
                        htmlValues += ('<tr><td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["id"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["country"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["state"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["jurisdiction"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["category"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["subcategory"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide">' + this.events[mmdd][j]["statute"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["reference"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["applicability"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["obligationtype"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide">' + this.events[mmdd][j]["obligationtitle"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide">' + this.events[mmdd][j]["obligation"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["firstlineofdefence"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["secondlineofdefence"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["thirdlineofdefence"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide">' + this.events[mmdd][j]["internalcontrols"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide">' + this.events[mmdd][j]["penalty"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["form"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["additionalurls"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["definition"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["authority"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["risk"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide">' + this.events[mmdd][j]["riskarea"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["frequency"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["subfrequency"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-thin">' + this.events[mmdd][j]["duedate"] + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide text-center status-format">' + this.renderStatusString(partStatus, lateStatus, complianceStatus) + '</td>'
                            + '<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' td-wide status-format">' + this.getGraphParam(this.events[mmdd][j]) + '</td>'
                            + '</tr>');
                        html += this.renderCalendarRowDivItemDivStart(mmdd, this.events[mmdd][j], j, partStatus);
                        html += this.renderCalendarRowDivItemDivTableHead(this.events[mmdd][j], partStatus);
                        html += this.renderCalendarRowDivItemDivTableBody(this.events[mmdd][j], partStatus, lateStatus, complianceStatus, mmdd, i, j);
                        html += this.renderCalendarAnnotations(this.events[mmdd][j]);
                        html += this.renderCalendarRowDivItemDivEnd();
                    }
                    html += this.renderCalendarRowDivEnd();
                }
                else {
                    const result = this.renderCalendarBlankRowDiv(hide, slice, i, firstDate, mmdd.split("/")[1] + "/" + mmdd.split("/")[0]);
                    //console.log('result', result);
                    html += result.html;
                    slice = result.slice;
                }
            }
            html += this.renderCalendarContainerDivEnd();
            //console.log('final risk severities', this.riskSeverityData);
            //this.period = firstDay?.getDate() + '/' + (firstDay!.getMonth()+1) + '/' + firstDay?.getFullYear() + " - " + endDay?.getDate() + '/' + (endDay!.getMonth()+1) + '/' + endDay?.getFullYear();
            this.period = period;
            this.csvDataCompliances = csvCols + "\n" + csvValues;
            this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';
            //console.log('renderevents htmlcols', this.htmlDataCompliances);
            //console.log('progress', this.period, total, notStarted, approved)
            html = html.replace("DASHBOARD_TOTAL", total + "");
            html = html.replace("DASHBOARD_NOT_STARTED", notStarted + "");
            html = html.replace("DASHBOARD_APPROVED", approved + "");
            html = html.replace("DASHBOARD_PENDING_APPROVAL", pendingApproval + "");
            html = html.replace("DASHBOARD_REJECTED", rejected + "");
            html = html.replace("DASHBOARD_IN_TIME", inTime + "");
            html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate + "");
            html = html.replace("DASHBOARD_LATE_REPORTED", lateReported + "");
            html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted + "");
            html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved + "");
            html = html.replace("DASHBOARD_SCHEDULED", scheduled + "");
            html = html.replace("DASHBOARD_NOT_COMPLIED", notComplied + "");
            html = html.replace("DASHBOARD_PARTIALLY_COMPLIED", partiallyComplied + "");
            html = html.replace("DASHBOARD_COMPLIED", complied + "");
            this.csvDataStats = 'Period,Total,Not Started,Approved,Pending Approval,Rejected,Past Due Date,Late Reported,Late Executed,Late Approved,Scheduled,Not Complied,Partially Complied,Complied\n';
            this.csvDataStats += this.period + "," + total + "," + notStarted + "," + approved + "," + pendingApproval + "," + rejected + "," + pastDueDate + "," + lateReported + "," + lateExecuted + "," + lateApproved + "," + scheduled + "," + notComplied + "," + partiallyComplied + "," + complied;
            this.htmlDataStats = 'Completeness<br /><br /><table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">Pending Approval</th><th class="w-14">Rejected</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + notStarted + '</td><td class="w-14 text-center td-odd">' + approved + '</td><td class="w-14 text-center td-odd">' + pendingApproval + '</td><td class="w-14 text-center td-odd">' + rejected + '</td></table>';
            this.htmlDataStats += '<br /><br />Timeliness<br /><br /><table class="mt-20 w-100"><tr><th class="w-14">Total</th><th class="w-14">In Time</th><th class="w-14">Past Due Date</th><th class="w-14">Late Reported</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + (total - (pastDueDate + lateApproved + lateExecuted)) + '</td><td class="w-14 text-center td-odd">' + pastDueDate + '</td><td class="w-14 text-center td-odd">' + lateReported + '</td><td class="w-14 text-center td-odd">' + lateExecuted + '</td><td class="w-14 text-center td-odd">' + lateApproved + '</td><tr></table>';
            this.htmlDataStats += '<br /><br />Compliance<br /><br /><table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Scheduled</th><th class="w-14">Not Complied</th><th class="w-14">Partially Complied</th><th class="w-14">Complied</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + scheduled + '</td><td class="w-14 text-center td-odd">' + notComplied + '</td><td class="w-14 text-center td-odd">' + partiallyComplied + '</td><td class="w-14 text-center td-odd">' + complied + '</td><tr></table>';
            return html;
        };
        this.renderStreamEvents = (index, month, year, showGraph = true) => {
            //console.log('flowgraph renderStreamEvents', this.flowGraph);
            const lastDay = this.getLastDayOfMonth(month, year);
            let firstDay = new Date(year, month, 1);
            let endDay = new Date(year, month, 1);
            endDay === null || endDay === void 0 ? void 0 : endDay.setDate(endDay.getDate() + lastDay + 1);
            var period = ("0" + (month + 1)).slice(-2) + "/" + ("0" + 1).slice(-2) + '/' + new Date().getFullYear() + ' - ' + ("0" + (month + 1)).slice(-2) + "/" + ("0" + lastDay).slice(-2) + '/' + new Date().getFullYear();
            return this.renderEvents(firstDay, endDay, 1, lastDay, showGraph, index, month, period);
        };
        this.renderThisEvents = (index, startDate, showGraph = true) => {
            var firstDate = new Date();
            var count = 7;
            //console.log('this start date', startDate);
            if (index === 0) {
                firstDate = this.getFirstDateOfWeek(startDate);
                //console.log('this first date', firstDate);
                count = 7;
            }
            if (index === 1) {
                firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
                count = this.getLastDayOfMonth(startDate.getMonth(), startDate.getFullYear());
                //console.log('last day of month', count);
            }
            const lastDay = count;
            let firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
            let endDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
            endDay === null || endDay === void 0 ? void 0 : endDay.setDate(endDay.getDate() + lastDay + 1);
            var period = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + 1).slice(-2) + '/' + firstDate.getFullYear() + ' - ' + ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + count).slice(-2) + '/' + firstDate.getFullYear();
            return this.renderEvents(firstDay, endDay, 1, lastDay, showGraph, index, (firstDate.getMonth()), period);
        };
        this.renderRangeEvents = (firstDate, count, eventsContainer) => {
            var lastDate = new Date(firstDate.getTime());
            lastDate.setDate(lastDate.getDate() + count - 1);
            const lastDay = count;
            let firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
            let endDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
            endDay === null || endDay === void 0 ? void 0 : endDay.setDate(endDay.getDate() + lastDay + 1);
            var period = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2) + '/' + firstDate.getFullYear() + ' - ' + ("0" + (lastDate.getMonth() + 1)).slice(-2) + "/" + ("0" + lastDate.getDate()).slice(-2) + '/' + lastDate.getFullYear();
            //console.log('rangeperiod', period)
            var html = this.renderEvents(firstDay, endDay, 1, lastDay, true, 0, (firstDate.getMonth()), period, firstDate);
            eventsContainer.querySelector('.calendar-right-data').innerHTML = html;
            this.attachTimelineFilterHandlers(eventsContainer);
            const radioExpander = eventsContainer.querySelector('#graph-radios-expander');
            radioExpander === null || radioExpander === void 0 ? void 0 : radioExpander.addEventListener('click', (e) => {
                const button = e.currentTarget;
                button.style.display = 'none';
                const arrRadios = eventsContainer.querySelectorAll('.chart-radio-item-secondary');
                arrRadios.forEach(div => {
                    div.style.display = 'block';
                });
            });
            const buttonArr = eventsContainer.querySelectorAll('.button-expand');
            for (var i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    let found = false;
                    for (var k = 0; k < this.selectedItems.length; k++) {
                        if (this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
                            found = true;
                        }
                    }
                    if (!found) {
                        this.selectedItems = [];
                        this.clearButtonSelection();
                    }
                    this._SfDetailContainer.style.display = 'block';
                    var yyyy = this.getCurrentYear(idArr[3]);
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + yyyy, null);
                });
            }
            const streamEventsContainer = eventsContainer.querySelectorAll('.stream-events-container');
            const buttonSelect = eventsContainer.querySelectorAll('.button-select');
            for (i = 0; i < buttonSelect.length; i++) {
                buttonSelect[i].addEventListener('click', (ev) => {
                    //console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    // const mmdd = idArr[2] + "/" + idArr[3];
                    // const j = idArr[4];
                    // const makercheckers = idArr[5];
                    const docs = idArr[6];
                    if (ev.target.checked) {
                        this.selectedItems.push(id);
                    }
                    else {
                        this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
                    }
                    if (this.selectedItems.length === 0) {
                        for (var k = 0; k < buttonSelect.length; k++) {
                            buttonSelect[k].style.display = 'block';
                            streamEventsContainer[k].style.display = 'block';
                        }
                    }
                    else {
                        if (this.selectedItems.length === 1) {
                            const id1 = id;
                            const idArr1 = id1.split("-");
                            const status = idArr1[13].replace(/_/g, '-');
                            this.selectedStatus = status;
                        }
                        for (var k = 0; k < buttonSelect.length; k++) {
                            const id1 = buttonSelect[k].id;
                            const idArr1 = id1.split("-");
                            const docs1 = idArr1[6];
                            const status = idArr1[13].replace(/_/g, '-');
                            if (docs == docs1 && status == this.selectedStatus) {
                            }
                            else {
                                buttonSelect[k].style.display = 'none';
                                streamEventsContainer[k].style.display = 'none';
                            }
                        }
                    }
                    // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'
                    // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            // this.clearGraphData();
            // //console.log('rendering range', firstDate, count);
            // this.selectedItems = [];
            // var html = '';
            // html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
            //   html += '<div part="stream-event-chart-selection" class="mb-20">';
            //     html += '<div part="td-head" class="mb-5">Select Chart</div>';
            //     html += '<div class="mb-10 d-flex flex-wrap align-center">';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
            //       html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
            //       html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
            //       html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
            //       html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
            //       html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
            //       html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
            //       html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
            //       html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
            //       html += '<div part="chart-radio-item"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
            //       html += '<label for="radio-frequency" part="input-label">Frequency</label></div>';
            //     html += '</div>';
            //   html += '</div>';
            //   html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart4" class="gone"></canvas></div><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></canvas></div></div>';
            //   html += '<div id="chart-settings-controls" class="mt-20"></div>'
            //   html += '<div id="chart-settings"></div>'
            // html += '</div>';
            // html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';
            // var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;
            // html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
            // html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span> <span id="graph-total">DASHBOARD_TOTAL</span></div>';
            // html += '<div part="badge-dashboard" class="stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span> <span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
            // html += '<div part="badge-dashboard" class="stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>In Progress:</span> <span id="graph-in-progress">DASHBOARD_IN_PROGRESS</span></div>';
            // html += '<div part="badge-dashboard" class="stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span><span id="graph-approved">DASHBOARD_APPROVED</span></div>';
            // // html += '<div part="calendar-tab-button-not-selected" class="gone d-flex justify-center align-center mr-10 mb-10 no-shrink cursor" id="button-status-more"><span class="material-symbols-outlined">navigate_next</span></div>';
            // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-not-started">timer</span>&nbsp;&nbsp;<span>In Time:</span> <span id="graph-in-time">DASHBOARD_IN_TIME</span></div>';
            // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-past-due-date">running_with_errors</span>&nbsp;&nbsp;<span>Past Due Date:</span> <span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
            // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-approved">running_with_errors</span>&nbsp;&nbsp;<span>Late Approved:</span> <span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
            // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span> <span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
            // html += '</div>';
            // html += '<div id="stream-event-filter" part="stream-event-total" class="d-flex flex-wrap"></div>';
            // var lastDate = new Date(firstDate.getTime());
            // lastDate.setDate(lastDate.getDate() + count)
            // this.eventsInWindow = [];
            // var csvCols = "", htmlCols = "";
            // var csvValues = "", htmlValues = "";
            // var period = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2) + ' - ' + ("0" + (lastDate.getMonth()+1)).slice(-2) + "/" + ("0" + lastDate.getDate()).slice(-2)
            // let firstDay: Date | null = null;
            // let endDay = null;
            // var slice = 2;
            // for(var i = 1; i <= count; i++) {
            //   if(i === 1) {
            //     firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
            //     endDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
            //   } else {
            //     endDay?.setDate(endDay.getDate() + 1);
            //   }
            //   const mmdd = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);
            //   var hide = true;
            //   //console.log('eventslice', slice);
            //   //console.log('event status', mmdd, this.events[mmdd]);
            //   if(this.events[mmdd] != null) {
            //     hide = false;
            //   } else if(i === 1){
            //     hide = false;
            //   } else if(i === (count)){
            //     hide = false;
            //   } else {
            //     const startNextDate = new Date(firstDate.getTime());
            //     startNextDate.setDate(firstDate.getDate() + 1);
            //     const startPrevDate = new Date(firstDate.getTime());
            //     startPrevDate.setDate(firstDate.getDate() - 1);
            //     const mmddNext = ("0" + (startNextDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
            //     const mmddPrev = ("0" + (startPrevDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
            //     //console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
            //     if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
            //       hide = false;
            //     }
            //   }
            //   if(this.events[mmdd] != null) {
            //     html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
            //       html += '<div part="stream-event-selected-date">'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+' |</div>';
            //       html += '<div class="stream-event-list-container flex-grow">'
            //       for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
            //         total++;
            //         this.events[mmdd][j]['mmdd'] = mmdd
            //         this.eventsInWindow.push(this.events[mmdd][j]);
            //         // this.events[mmdd][j] = this.renderLatestCompliance(("0" + (firstDate.getMonth()+1)).slice(-2), this.events[mmdd][j]);
            //         var partStatus = "";
            //         var lateStatus = "in-time";
            //         if(this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
            //           partStatus = "status-approved";
            //           if(this.getLateExecuted(mmdd, this.events[mmdd][j])) {
            //             lateStatus = "late-executed"
            //           } else {
            //             if(this.getLateApproved(mmdd, this.events[mmdd][j])) {
            //               lateStatus = "late-approved"
            //             }
            //           }
            //         } else if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
            //           partStatus = "status-in-progress";
            //           if(this.getPastDueDate(mmdd)) {
            //             lateStatus = "past-due-date"
            //           }
            //         } else {
            //           partStatus = "status-not-started";
            //           if(this.getPastDueDate(mmdd)) {
            //             lateStatus = "past-due-date"
            //           }
            //         }
            //         this.updateRiskAreaStats(this.events[mmdd][j]['riskarea'], partStatus, lateStatus);
            //         this.updateRiskSeverityStats(this.events[mmdd][j]['risk'], partStatus, lateStatus);
            //         this.updateFunctionStats(this.events[mmdd][j]['functions'], partStatus, lateStatus);
            //         this.updateObligationTypeStats(this.events[mmdd][j]['obligationtype'], partStatus, lateStatus);
            //         this.updateJurisdictionStats(this.events[mmdd][j]['jurisdiction'], partStatus, lateStatus)
            //         this.updateFrequencyStats(this.events[mmdd][j]['frequency'], partStatus, lateStatus)
            //         this.updateLocationStats([this.events[mmdd][j]['locationname']], partStatus, lateStatus)
            //         html += '<div class="stream-events-container flex-grow">';
            //           html += '<div class="hidden-tags hide">'+JSON.stringify(this.events[mmdd][j]['tags'])+'</div>'
            //           html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>'
            //           html += '<div part="stream-events-event-title" class="stream-events-event-title d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+j + '-' + (((this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0)) ? '1' : '0') + '-' + (((this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0)) ? '1' : '0') + '-' + this.events[mmdd][j].entityid.replace(/-/g, '_') + '-' + this.events[mmdd][j].locationid.replace(/-/g, '_') + '-' + this.events[mmdd][j].id.replace(/-/g, '_') +  '-' + this.events[mmdd][j].duedate.split('/')[1] + '-' + this.events[mmdd][j].duedate.split('/')[0] + '-' + this.events[mmdd][j].duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+this.events[mmdd][j]['obligationtitle']+'" minLength="100"></sf-i-elastic-text></div>';
            //           html += '<table class="stream-events-container-table">';
            //           html += '<thead>';
            //           html += '<th part="td-head">';
            //           html += 'Status'
            //           if(csvCols.indexOf('Status') < 0) {
            //             csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
            //             htmlCols += '<tr><th>Id</th><th>Status</th><th>Statute</th><th>Reference</th><th class="w-200px">Applicability</th><th>ObligationType</th><th class="w-200px">Obligation</th><th class="w-200px">InternalControls</th><th class="w-200px">Penalty</th><th>RiskSeverity</th><th>Frequency</th><th>SubFrequency</th><th>DueDate</th><th>ReportParameter</th></tr>'
            //           }
            //           html += '</th>';
            //           html += '<th part="td-head">';
            //           html += '</th>';
            //           html += '<th part="td-head">';
            //           html += 'Location'
            //           html += '</th>'
            //           html += '<th part="td-head">';
            //           html += 'Entity'
            //           html += '</th>'
            //           html += '<th part="td-head">';
            //           html += 'Country'
            //           html += '</th>'
            //           html += '<th part="td-head">';
            //           html += 'Function'
            //           html += '</th>'
            //           for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
            //             if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
            //               html += '<th part="td-head" class="bg-left-no-border">';
            //               html += Object.keys(this.events[mmdd][j])[k];
            //               html += '</th>';
            //             }
            //           }
            //           //console.log('listing docs',this.events[mmdd][j].documents )
            //           if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
            //             html += '<th part="td-head">';
            //             html += 'Docs'
            //             html += '</th>';
            //           }
            //           if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
            //             html += '<th part="td-head">';
            //             html += 'Comments'
            //             html += '</th>';
            //           } else {
            //             if(partStatus != "status-approved") {
            //               notStarted++;
            //             }
            //           }
            //           if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
            //             html += '<th part="td-head">';
            //             html += 'Updated'
            //             html += '</th>';
            //           }
            //           if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
            //             html += '<th part="td-head">';
            //             html += ''
            //             html += '</th>'
            //           }
            //           if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
            //             html += '<th part="td-head">';
            //             html += ''
            //             html += '</th>'
            //           }
            //           // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
            //           //   html += '<th part="td-head">';
            //           //   html += Object.keys(this.events[mmdd][j])[k];
            //           //   html += '</th>';
            //           // }
            //           html += '</thead>';
            //           html += '<tbody>';
            //           csvValues += (period + ',');
            //           htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["id"]+'</td>');
            //           if(partStatus == "status-approved") {
            //             approved++
            //             html += '<td part="td-body">';
            //             if(lateStatus == "late-executed") {
            //               lateExecuted++;
            //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //                 html += '<span class="material-symbols-outlined color-done color-done-item color-done-item-'+i+'">check_circle</span>';
            //               }
            //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
            //                 html += '<span class="material-icons color-late-executed color-late-executed color-late-executed-'+i+'">running_with_errors</span>';
            //               }
            //               csvValues += 'approved late-executed,';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">approved late-executed</td>');
            //             } else if(lateStatus == "late-approved") {
            //               lateApproved++;
            //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //                 html += '<span class="material-symbols-outlined color-done color-done-item color-done-item-'+i+'">check_circle</span>'
            //               }
            //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
            //                 html += '<span class="material-icons color-late-approved color-late-approved color-late-approved-'+i+'">running_with_errors</span>'
            //               }
            //               csvValues += 'approved late-approved,';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">approved late-approved</td>');
            //             } else {
            //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //                 html += '<span class="material-symbols-outlined color-done color-done-item color-done-item-'+i+'">check_circle</span>'
            //               }
            //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
            //                 html += '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-'+i+'">timer</span>'
            //               }
            //               csvValues += 'approved,';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">approved</td>');
            //             }
            //             html += '</td>';
            //           } else if(partStatus == "status-in-progress") {
            //             html += '<td part="td-body">';
            //             if(lateStatus == "past-due-date") {
            //               pastDueDate++;
            //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //                 html += '<span class="material-symbols-outlined color-pending color-pending-item color-pending-item-'+i+'">pending</span>'
            //               }
            //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
            //                 html += '<span class="material-icons color-past-due-date color-past-due-date-item color-past-due-date-item-'+i+'">running_with_errors</span>'
            //               }
            //               csvValues += 'in-progress past-due-date,';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">in-progress past-due-date</td>');
            //             } else {
            //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //                 html += '<span class="material-symbols-outlined color-pending color-pending-item color-pending-item-'+i+'">pending</span>'
            //               }
            //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
            //                 html += '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-'+i+'">timer</span>'
            //               }
            //               csvValues += 'in-progress,';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">in-progress</td>');
            //             }
            //             html += '</td>';
            //           } else {
            //             html += '<td part="td-body">';
            //             if(lateStatus == "past-due-date") {
            //               pastDueDate++;
            //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //                 html += '<span class="material-icons color-not-started color-not-started-item color-not-started-item-'+i+'">schedule</span>'
            //               }
            //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
            //                 html += '<span class="material-icons color-past-due-date color-past-due-date-item color-past-due-date-item-'+i+'">running_with_errors</span>'
            //               }
            //               csvValues += 'not started past-due-date,';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">not-started past-due-date</td>');
            //             } else {
            //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //                 html += '<span class="material-icons color-not-started color-not-started-item color-not-started-item-'+i+'">schedule</span>'
            //               }
            //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
            //                 html += '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-'+i+'">timer</span>'
            //               }
            //               csvValues += 'not started,';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">not-started</td>');
            //             }
            //             html += '</td>';
            //           }
            //           html += '<td id="td-expand-'+i+'" part="td-body">';
            //           html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
            //           html += '</td>';
            //           html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
            //           html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
            //           html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
            //           var functions = '';
            //           for(const element of this.events[mmdd][j]["functions"])  {
            //             functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
            //           }
            //           functions = functions.replace(/,\s*$/, "");
            //           html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
            //           for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
            //             if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
            //               html += '<td part="td-body">';
            //               if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
            //                 html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
            //               } else {
            //                 html += ' <sf-i-elastic-text text="'+this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
            //               }
            //               html += '</td>';
            //             }
            //           }
            //           csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["statute"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["reference"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["applicability"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligationtype"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligation"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["internalcontrols"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["penalty"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["risk"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["frequency"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["subfrequency"]+'</td>');
            //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["duedate"]+'</td>');
            //           if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
            //             html += '<td part="td-body">';
            //             html += '<span class="material-icons muted">description</span>'
            //             html += (this.events[mmdd][j].documents).length
            //             html += '</td>';
            //           }
            //           if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
            //             html += '<td part="td-body">';
            //             html += '<span class="material-icons muted">forum</span>'
            //             html += (this.events[mmdd][j].comments).length
            //             html += '</td>';
            //           }
            //           if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
            //             html += '<td part="td-body">';
            //             html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime())
            //             html += '</td>';
            //           }
            //           if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
            //             html += '<td part="td-body">';
            //             html += '<span class="material-symbols-outlined muted">done_all</span>'
            //             html += '</td>';
            //           }
            //           if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
            //             html += '<th part="td-body">';
            //             html += '<span class="material-symbols-outlined muted">scan_delete</span>'
            //             html += '</th>'
            //           }
            //           csvValues += '\n';
            //           // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
            //           //   html += '<th part="td-body">';
            //           //   if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
            //           //     html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
            //           //   } else {
            //           //     html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
            //           //   }
            //           //   html += '</th>';
            //           // }
            //           html += '</tbody>';
            //           html += '</table>';
            //           html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'
            //           let reporterStr = this.getReporterStringFromEvent(this.events[mmdd][j]);
            //           let approverStr = this.getApproverStringFromEvent(this.events[mmdd][j]);
            //           if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS && this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
            //             let graphParam = '';
            //             if(Array.isArray(this.events[mmdd][j][this.flowGraph])) {
            //               graphParam = this.events[mmdd][j][this.flowGraph].toString().replace(/ *\([^)]*\) */g, "");
            //             } else {
            //               graphParam = this.events[mmdd][j][this.flowGraph].replace(/ *\([^)]*\) */g, "");
            //             }
            //             html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + graphParam + '</div>'+reporterStr + approverStr+'</div>';
            //             htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+graphParam+'</td>');
            //           } else {
            //             if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) {
            //               html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + partStatus.replace('status-', '') + '</div>'+reporterStr + approverStr+'</div>';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+partStatus.replace('status-', '')+'</td>');
            //             }
            //             if(this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
            //               html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + lateStatus + '</div>'+reporterStr + approverStr+'</div>';
            //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+lateStatus+'</td>');
            //             }
            //           }
            //           htmlValues += ('</tr>');
            //         html += '</div>';
            //       }
            //       html += '</div>';
            //     html += '</div>';
            //   } else {
            //     if(!hide) {
            //       html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
            //       html += '<div>'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+'</div>';
            //       html += '</div>';
            //       slice = 2;
            //     } else {
            //       //console.log('eventslice=person', i, slice, i%slice);
            //       if(i%slice === 0) {
            //         html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
            //         //html += '<div>'+("0" + i).slice(-2)+' |</div>';
            //         html += '<div>.</div>';
            //         html += '</div>';
            //         slice+=3;
            //       }
            //     }
            //   }
            //   firstDate.setDate(firstDate.getDate() + 1);
            // }
            // html += '</div>';
            // this.period = firstDay?.getDate() + '/' + (firstDay!.getMonth()+1) + '/' + firstDay?.getFullYear() + " - " + endDay?.getDate() + '/' + (endDay!.getMonth()+1) + '/' + endDay?.getFullYear();
            // this.csvDataCompliances = csvCols + "\n" + csvValues;
            // this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';
            // inProgress = total - notStarted - approved;
            // //console.log('progress', total, notStarted, approved)
            // html = html.replace("DASHBOARD_TOTAL", total+"");
            // html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
            // html = html.replace("DASHBOARD_APPROVED", approved+"");
            // html = html.replace("DASHBOARD_IN_PROGRESS", inProgress+"");
            // html = html.replace("DASHBOARD_IN_TIME", (total - pastDueDate - lateApproved - lateExecuted)+"");
            // html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
            // html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
            // html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");
            // this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
            // this.csvDataStats += this.period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;
            // this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
            // this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+inProgress+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>';
        };
        this.renderRegisterEvents = (events) => {
            var html = '';
            this.csvDataRegisters = '';
            html += '<div class="d-flex scroll-x w-100p">';
            for (var i = 0; i < Object.keys(events).length; i++) {
                const country = Object.keys(events)[i];
                html += ('<button class="tab-button tab-button-country" id="tab-button-country-' + i + '" part="' + (this.selectedCountryTab == i ? 'calendar-tab-button-selected-small' : 'calendar-tab-button-not-selected-small') + '">' + country + '</button>');
            }
            html += '</div>';
            html += '<div id="register-list" class="pl-10 pt-10"></div>';
            this._SfRegisterContainer.querySelector('.calendar-right-data').innerHTML = html;
            const divRegisterList = this._SfRegisterContainer.querySelector('.calendar-right-data').querySelector('#register-list');
            const arrButtons = this._SfRegisterContainer.querySelector('.calendar-right-data').querySelectorAll('.tab-button-country');
            for (i = 0; i < arrButtons.length; i++) {
                const button = Util.clearListeners(arrButtons[i]);
                button.addEventListener('click', (e) => {
                    const index = e.currentTarget.id.split('-')[3];
                    this.selectedCountryTab = index;
                    this.renderRegisterEvents(events);
                });
            }
            if (this.selectedCountryTab >= 0) {
                const index = this.selectedCountryTab;
                //console.log('indexclicked', index);
                const objCountry = events[Object.keys(events)[index]];
                //console.log('indexclicked', objCountry);
                var html = '';
                this.csvDataRegisters += '"ID",';
                for (var i = 0; i < Object.keys(objCountry).length; i++) {
                    const statute = Object.keys(objCountry)[i];
                    // this.csvDataRegisters += ('\n\n"' + statute + '"\n\n');
                    html += ('<h3 part="register-section-title-' + (i != 0 ? 'not-selected' : 'selected') + '" class="left-sticky register-statute" id="register-statute-' + i + '">' + statute + '</h3>');
                    html += '<div class="w-100p scroll-x ' + (i != 0 ? 'hide' : '') + '" id="register-body-' + i + '" >';
                    html += '<table>';
                    if (i === 0) {
                        for (var k = 0; k < JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols).length; k++) {
                            if (!this.EXCLUDE_COLS_FROM_REGS.includes(JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols)[k].toLowerCase())) {
                                this.csvDataRegisters += ('"' + JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols)[k] + '",');
                                console.log('loggin col', JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols)[k]);
                            }
                        }
                        this.csvDataRegisters = this.csvDataRegisters.replace(/,\s*$/, "");
                        this.csvDataRegisters += ('\n');
                    }
                    for (var j = 0; j < Object.keys(objCountry[statute]).length; j++) {
                        const complianceId = Object.keys(objCountry[statute])[j];
                        const compliance = objCountry[statute][complianceId];
                        const data = JSON.parse(compliance.data);
                        const cols = JSON.parse(compliance.cols);
                        this.csvDataRegisters += ('"' + complianceId + '",');
                        html += '<tr>';
                        html += ('<td class="td-body" part="td-body-register"><button part="button-icon" id="button-icon-country-' + index + '-' + i + '-' + j + '" class="button-icon-country"><span class="material-symbols-outlined">open_in_new</span></button></td>');
                        html += ('<td class="td-body" part="td-body-register"><span part="td-head" style="padding-left: 0px !important">ID</span><br /><sf-i-elastic-text text="' + complianceId + '" minLength="10" lineSize="4"></sf-i-elastic-text></td>');
                        for (var k = 0; k < cols.length; k++) {
                            if (!this.EXCLUDE_COLS_FROM_REGS.includes(cols[k].toLowerCase())) {
                                html += ('<td class="td-body" part="td-body-register"><span part="td-head" style="padding-left: 0px !important">' + cols[k] + '</span><br /><sf-i-elastic-text text="' + data[k] + '" minLength="80" lineSize="4"></sf-i-elastic-text></td>');
                                this.csvDataRegisters += ('"' + (data[k] + "").replace(/"/g, '') + '",');
                                // this.csvDataRegisters += ('",');
                            }
                        }
                        this.csvDataRegisters = this.csvDataRegisters.replace(/,\s*$/, "");
                        this.csvDataRegisters += ('\n');
                        console.log('enter');
                        html += '</tr>';
                    }
                    html += '</table>';
                    html += '</div>';
                }
                divRegisterList.innerHTML = html;
                console.log('csvdataregisters', this.csvDataRegisters);
                const arrButtonCountries = this._SfRegisterContainer.querySelector('.calendar-right-data').querySelectorAll('.button-icon-country');
                for (i = 0; i < arrButtonCountries.length; i++) {
                    const button = Util.clearListeners(arrButtonCountries[i]);
                    button.addEventListener('click', (e) => {
                        const index = e.currentTarget.id.split('-')[3];
                        const i1 = e.currentTarget.id.split('-')[4];
                        const j1 = e.currentTarget.id.split('-')[5];
                        //console.log('country clicked', index, i1, j1);
                        const objCountry = events[Object.keys(events)[index]];
                        const statute = Object.keys(objCountry)[i1];
                        const complianceId = Object.keys(objCountry[statute])[j1];
                        const compliance = objCountry[statute][complianceId];
                        this.renderEventDetailShort(compliance);
                    });
                }
                const arrRegisterStatutes = this._SfRegisterContainer.querySelector('.calendar-right-data').querySelectorAll('.register-statute');
                for (i = 0; i < arrRegisterStatutes.length; i++) {
                    const button = Util.clearListeners(arrRegisterStatutes[i]);
                    button.addEventListener('click', (e) => {
                        const button = e.currentTarget;
                        const index = e.currentTarget.id.split('-')[2];
                        console.log('index', index);
                        const divBody = this._SfRegisterContainer.querySelector('.calendar-right-data').querySelector('#register-body-' + index);
                        if (divBody.classList.contains('hide')) {
                            divBody.classList.remove('hide');
                            button.setAttribute('part', 'register-section-title-selected');
                        }
                        else {
                            divBody.classList.add('hide');
                            button.setAttribute('part', 'register-section-title-not-selected');
                        }
                    });
                }
            }
            else {
                const index = 0;
                this.selectedCountryTab = index;
                this.renderRegisterEvents(events);
            }
        };
        this.checkStartDateEarliness = (value) => {
            var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var startDateChosen = new Date(value);
            if (startDateChosen.getTime() > startDateCalendar.getTime()) {
                return true;
            }
            else {
                return false;
            }
        };
        this.checkEndDateLateness = (value) => {
            var endDateCalendar = new Date(this.calendarStartMM + '/' + (this.calendarStartDD + 10) + '/' + (parseInt(this.calendarStartYYYY) + 1));
            var endDateChosen = new Date(value);
            //console.log('end date calendar', endDateCalendar);
            //console.log('end date chosen', endDateChosen);
            if (endDateChosen.getTime() > endDateCalendar.getTime()) {
                return false;
            }
            else {
                return true;
            }
        };
        this.attachHandlers = (eventContainer, valueStart, valueEnd) => {
            const radioCompleteness = eventContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderCompletenessGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioTimeliness = eventContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
                //console.log('setting flow graph to ', this.flowGraph);
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderTimelinessGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioRisk = eventContainer.querySelector('#radio-risk');
            radioRisk === null || radioRisk === void 0 ? void 0 : radioRisk.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
                //console.log('setting flow graph to ', this.flowGraph);
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderRiskGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioFunction = eventContainer.querySelector('#radio-function');
            radioFunction === null || radioFunction === void 0 ? void 0 : radioFunction.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_FUNCTION;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderFunctionGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioRiskSeverity = eventContainer.querySelector('#radio-riskseverity');
            radioRiskSeverity === null || radioRiskSeverity === void 0 ? void 0 : radioRiskSeverity.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderRiskSeverityGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioObligationType = eventContainer.querySelector('#radio-obligationtype');
            radioObligationType === null || radioObligationType === void 0 ? void 0 : radioObligationType.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderObligationTypeGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioJurisdiction = eventContainer.querySelector('#radio-jurisdiction');
            radioJurisdiction === null || radioJurisdiction === void 0 ? void 0 : radioJurisdiction.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderJurisdictionGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioFrequency = eventContainer.querySelector('#radio-frequency');
            radioFrequency === null || radioFrequency === void 0 ? void 0 : radioFrequency.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderFrequencyGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioSubcategory = eventContainer.querySelector('#radio-subcategory');
            radioSubcategory === null || radioSubcategory === void 0 ? void 0 : radioSubcategory.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_SUBCATEGORY;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderSubcategoryGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            const radioLocation = eventContainer.querySelector('#radio-location');
            radioLocation === null || radioLocation === void 0 ? void 0 : radioLocation.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_LOCATION;
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), eventContainer);
                this.renderLocationGraph(eventContainer);
                this.attachHandlers(eventContainer, valueStart, valueEnd);
            });
            // const buttonStatusMore = (this._SfCustomContainer as HTMLDivElement).querySelector('#button-status-more');
            // buttonStatusMore?.addEventListener('click', () => {
            //   const divStatusList = (this._SfCustomContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
            //   for(var i = 0; i < divStatusList.length; i++) {
            //     divStatusList[i].style.display = 'flex';
            //   }
            //   (buttonStatusMore as HTMLButtonElement).style.display = 'none';
            // });
        };
        this.processFindSelection = async (eventContainer, searchString) => {
            var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));
            const tsStart = new Date(startDateCalendar);
            const tsEnd = new Date(endDateCalendar);
            tsStart.setDate(tsStart.getDate() - 2);
            tsEnd.setDate(tsEnd.getDate() + 2);
            //console.log('tsstart', tsStart);
            //console.log('tsend', tsEnd);
            // await this.fetchUserCalendar_2(tsStart.getMonth() + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), valueEnd.split('-')[1] + "/" + valueEnd.split('-')[2] + "/" + valueEnd.split('-')[0]);
            await this.fetchAndYearlyRenderUserCalendar_2((tsStart.getMonth() + 1) + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), (tsEnd.getMonth() + 1) + "/" + tsEnd.getDate() + "/" + tsEnd.getFullYear(), searchString);
            this.renderRangeEvents(startDateCalendar, ((endDateCalendar.getTime() + 24 * 60 * 60 * 1000) - startDateCalendar.getTime()) / (1000 * 60 * 60 * 24), this._SfFindContainer);
            this.attachHandlers(eventContainer, this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY, this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));
            if (eventContainer.innerHTML.indexOf('myChart') >= 0) {
                this.renderComplianceGraph(eventContainer);
            }
        };
        this.processDateSelection = async (eventContainer) => {
            var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));
            var valueStart = this._SfCustomContainer.querySelector('#stream-start-date').value;
            if (valueStart == "") {
                valueStart = this._SfCustomContainer.querySelector('#stream-start-date-mobile').value;
            }
            var valueEnd = this._SfCustomContainer.querySelector('#stream-end-date').value;
            if (valueEnd == "") {
                valueEnd = this._SfCustomContainer.querySelector('#stream-end-date-mobile').value;
            }
            //console.log('valuestart', valueStart);
            //console.log('valueend', valueEnd);
            if (valueStart != "" && valueEnd != "") {
                this.initCustomRightCol();
                if (!this.checkStartDateEarliness(valueStart)) {
                    this._SfStreamEventStatus.innerHTML = "Chosen Start Date cannot be earlier than " + startDateCalendar;
                    return;
                }
                if (!this.checkEndDateLateness(valueEnd)) {
                    this._SfStreamEventStatus.innerHTML = "Chosen End Date cannot be later than " + endDateCalendar;
                    return;
                }
                if (new Date(valueStart).getTime() > new Date(valueEnd).getTime()) {
                    this._SfStreamEventStatus.innerHTML = "Chosen End Date cannot be earlier than chosen Start Date";
                    return;
                }
                if ((new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24) > 400) {
                    this._SfStreamEventStatus.innerHTML = "Chosen time window cannot be greater than 400 days";
                    return;
                }
                const tsStart = new Date(valueStart);
                const tsEnd = new Date(valueEnd);
                tsStart.setDate(tsStart.getDate() - 2);
                tsEnd.setDate(tsEnd.getDate() + 2);
                //console.log('tsstart', tsStart);
                //console.log('tsend', tsEnd);
                // await this.fetchUserCalendar_2(tsStart.getMonth() + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), valueEnd.split('-')[1] + "/" + valueEnd.split('-')[2] + "/" + valueEnd.split('-')[0]);
                await this.fetchAndYearlyRenderUserCalendar_2((tsStart.getMonth() + 1) + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), (tsEnd.getMonth() + 1) + "/" + tsEnd.getDate() + "/" + tsEnd.getFullYear());
                this.renderRangeEvents(new Date(valueStart), ((new Date(valueEnd).getTime() + 24 * 60 * 60 * 1000) - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24), this._SfCustomContainer);
            }
            else if (valueStart != "" && valueEnd == "") {
                this._SfStreamEventStatus.innerHTML = "Please select End Date";
            }
            else if (valueStart == "" && valueEnd != "") {
                this._SfStreamEventStatus.innerHTML = "Please select Start Date";
            }
            else {
                this._SfStreamEventStatus.innerHTML = "Please select Start Date and End Date";
            }
            this.attachHandlers(eventContainer, valueStart, valueEnd);
            if (eventContainer.innerHTML.indexOf('myChart') >= 0) {
                this.renderComplianceGraph(eventContainer);
            }
        };
        this.initFindRightCol = () => {
            var html = "";
            html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';
            html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
            html += '<div><h2 id="stream-event-status">Type something and press enter</h2></div>';
            html += '</div>';
            html += '</div>';
            this._SfFindContainer.querySelector('.calendar-right-data').innerHTML = html;
        };
        this.initCustomRightCol = () => {
            var html = "";
            html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';
            html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
            html += '<div><h2 id="stream-event-status">Please select Start Date and End Date</h2></div>';
            html += '</div>';
            html += '</div>';
            this._SfCustomContainer.querySelector('.calendar-right-data').innerHTML = html;
        };
        this.checkAndShowBulk = () => {
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-checkbox');
            var checked = 0;
            //console.log('checkAndShowBulk', inputArr.length);
            for (var i = 0; i < inputArr.length; i++) {
                //console.log(inputArr[i].checked);
                if (inputArr[i].checked) {
                    checked++;
                }
            }
            //console.log('checkAndShowBulk', checked);
            if (checked > 1) {
                return true;
            }
            return false;
        };
        this.calculateAndShowSummary = () => {
            //console.log('showing summary',this.mappedValuesUsers);
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-users');
            var mapped = 0;
            for (var i = 0; i < Object.keys(this.mappedValuesUsers).length; i++) {
                if (this.mappedValuesUsers[Object.keys(this.mappedValuesUsers)[i]].length > 0) {
                    mapped++;
                }
            }
            this._SfMappingContainer.querySelector('#row-unmapped-summary').innerHTML = 'Completed ' + mapped + ' / ' + inputArr.length;
            this._SfMappingContainer.querySelector('#row-unmapped-graph').querySelector('.div-graph-pending').style.width = ((inputArr.length - mapped) * 100 / (inputArr.length)) + '%';
            this._SfMappingContainer.querySelector('#row-unmapped-graph').querySelector('.div-graph-complete').style.width = ((mapped) * 100 / (inputArr.length)) + '%';
            //console.log('showing summary', mapped, Object.keys(this.mappedValuesUsers).length);
            if (mapped == inputArr.length) {
                this._SfMappingContainer.querySelector('#button-back-add-mapping').style.visibility = 'visible';
            }
            else {
                this._SfMappingContainer.querySelector('#button-back-add-mapping').style.visibility = 'hidden';
            }
        };
        this.showAllEvents = () => {
            this._SfMappingContainer.querySelector('#row-unmapped-filter-all').checked = true;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement)!.checked = false;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement)!.checked = false;
            //this.renderMapping(this.unmappedEvents)
            this.applyFilter();
            this.calculateAndShowSummary();
        };
        this.showMappedEvents = () => {
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement)!.checked = false;
            this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped').checked = true;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement)!.checked = false;
            //this.renderMapping(this.unmappedEvents)
            this.applyFilter("mapped");
        };
        this.showUnmappedEvents = () => {
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement)!.checked = false;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement)!.checked = false;
            this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped').checked = true;
            //this.renderMapping(this.unmappedEvents)
            this.applyFilter("unmapped");
        };
        this.updateInAllSelections = (param, value) => {
            //console.log('updateinallselections', param, value);
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-checkbox');
            const inputDatesArr = this._SfMappingContainer.querySelectorAll('.input-dates');
            const divDatesArr = this._SfMappingContainer.querySelectorAll('.div-dates');
            const inputTagsArr = this._SfMappingContainer.querySelectorAll('.input-tags');
            const divTagsArr = this._SfMappingContainer.querySelectorAll('.div-tags');
            const inputUsersArr = this._SfMappingContainer.querySelectorAll('.input-users');
            const divUsersArr = this._SfMappingContainer.querySelectorAll('.div-users');
            for (var i = 0; i < inputArr.length; i++) {
                //console.log('updateinallselections', i);
                if (inputArr[i].checked) {
                    if (param == "duedate") {
                        inputDatesArr[i].value = value;
                        divDatesArr[i].innerHTML = value;
                        this.mappedValuesDueDates[i] = value;
                    }
                    if (param == "tags") {
                        inputTagsArr[i].preselectedValues = JSON.stringify(value);
                        inputTagsArr[i].populatePreselected();
                        divTagsArr[i].innerHTML = '';
                        var html = '';
                        for (var j = 0; j < value.length; j++) {
                            html += value[j];
                            if (j < (value.length - 1)) {
                                html += ",";
                            }
                        }
                        divTagsArr[i].innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                        this.mappedValuesTags[i] = value;
                    }
                    if (param == "users") {
                        // inputUsersArr[i].value = value;
                        // divUsersArr[i].innerHTML = value;
                        // this.mappedValuesUsers[i] = value;
                        inputUsersArr[i].preselectedValues = JSON.stringify(value);
                        inputUsersArr[i].populatePreselected();
                        divUsersArr[i].innerHTML = '';
                        var html = '';
                        for (var j = 0; j < value.length; j++) {
                            html += value[j];
                            if (j < (value.length - 1)) {
                                html += ",";
                            }
                        }
                        divUsersArr[i].innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                        this.mappedValuesUsers[i] = value;
                        this.updateMappingStatus(value, i);
                        this.calculateAndShowSummary();
                    }
                }
            }
        };
        this.updateMappingStatus = (value, clickIndex) => {
            //console.log('clickindex', clickIndex);
            if (value.length > 0) {
                this._SfMappingContainer.querySelector('#row-unmapped-status-' + clickIndex).innerHTML = '<span class="material-icons color-done">check_circle</done>';
            }
            else {
                this._SfMappingContainer.querySelector('#row-unmapped-status-' + clickIndex).innerHTML = '<span class="material-icons color-pending">pending</done>';
            }
        };
        this.filterEventsInWindow = (tags, _ctx, divContainer) => {
            const arrData = [];
            //console.log('window', this.eventsInWindow, ctx);
            if (divContainer != null)
                this.clearGraph(divContainer, 2);
            if (divContainer != null)
                this.clearGraph(divContainer, 3);
            for (var i = 0; i < tags.length; i++) {
                var countApproved = 0;
                var countInProgress = 0;
                var countNotStarted = 0;
                for (var j = 0; j < this.eventsInWindow.length; j++) {
                    const event = this.eventsInWindow[j];
                    for (var l = 0; l < event.tags.length; l++) {
                        if ((event.tags[l] + "").toLowerCase().indexOf((tags[i] + "").toLowerCase().split(';')[1]) >= 0) {
                            //console.log('plot approved', event.approved)
                            //if(event.documents == null || event.documents[event.mmdd + '/' + new Date().getFullYear()] == null || JSON.parse(event.documents[event.mmdd + '/' + new Date().getFullYear()]) == null) {
                            if (event.comments == null || event.comments.length === 0) {
                                countNotStarted++;
                            }
                            else if (event.approved == null) {
                                countInProgress++;
                            }
                            else if (!event.approved) {
                                countInProgress++;
                            }
                            else if (event.approved) {
                                countApproved++;
                            }
                            // if(event.documents == null || event.documents.length === 0) {
                            //   countNotStarted++;
                            // } else if (event.approved == null) {
                            //   countInProgress++;
                            // } else if(!event.approved) {
                            //   countInProgress++;
                            // } else if(event.approved) {
                            //   countApproved++;
                            // }
                        }
                    }
                }
                const arrItem = [countApproved, countInProgress, countNotStarted];
                arrData.push(arrItem);
            }
            //console.log(arrData);
            const dataSetApproved = [];
            const dataSetInProgress = [];
            const dataSetNotStarted = [];
            for (i = 0; i < arrData.length; i++) {
                dataSetApproved.push(arrData[i][0]);
                dataSetInProgress.push(arrData[i][1]);
                dataSetNotStarted.push(arrData[i][2]);
            }
            //console.log('plotting dataset', dataSetApproved, dataSetInProgress, dataSetNotStarted);
            const tagsCompressed = [];
            for (i = 0; i < tags.length; i++) {
                tagsCompressed.push(this.truncate(tags[i].split(';')[0], 20, false, false));
            }
            if (divContainer != null) {
                this.clearGraph(divContainer, 1);
                this.showGraph(divContainer, 4);
            }
            if (this.fill == "solid") {
                const data = {
                    labels: tagsCompressed,
                    datasets: [
                        {
                            label: 'Approved',
                            data: dataSetApproved,
                            backgroundColor: '#8cd039'
                        },
                        {
                            label: 'In Progress',
                            data: dataSetInProgress,
                            backgroundColor: '#FFBA49'
                        },
                        {
                            label: 'Not Started',
                            data: dataSetNotStarted,
                            backgroundColor: '#A4A9AD'
                        }
                    ]
                };
                const ctx4 = divContainer === null || divContainer === void 0 ? void 0 : divContainer.querySelector('#myChart4');
                (divContainer === null || divContainer === void 0 ? void 0 : divContainer.querySelector('#myChart4')).classList.remove('gone');
                if (this.fill == "solid") {
                    this.renderChart4(ctx4, 'bar', data, "Custom Plot");
                }
                else {
                    this.renderChart4(ctx4, 'bar', data, "Custom Plot");
                }
            }
            else {
                const data = {
                    labels: tagsCompressed,
                    datasets: [
                        {
                            label: 'Approved',
                            data: dataSetApproved,
                            backgroundColor: Util.createDiagonalPattern3('#8cd039')
                        },
                        {
                            label: 'In Progress',
                            data: dataSetInProgress,
                            backgroundColor: Util.createDiagonalPattern1('#FFBA49')
                        },
                        {
                            label: 'Not Started',
                            data: dataSetNotStarted,
                            backgroundColor: Util.createDiagonalPattern2('#A4A9AD')
                        }
                    ]
                };
                const ctx4 = divContainer === null || divContainer === void 0 ? void 0 : divContainer.querySelector('#myChart4');
                (divContainer === null || divContainer === void 0 ? void 0 : divContainer.querySelector('#myChart4')).classList.remove('gone');
                if (this.fill == "solid") {
                    this.renderChart4(ctx4, 'bar', data, "Custom Plot");
                }
                else {
                    this.renderChart4(ctx4, 'bar', data, "Custom Plot");
                }
                // this.renderChart(ctx, 'bar', data, "Custom Plot")
            }
        };
        this.sleep = (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        };
        this.hideTabContainers = async () => {
            this._SfOnboardingStatutesContainer.style.display = 'none';
            this._SfOnboardingCompliancesContainer.style.display = 'none';
            this._SfOnboardingCountriesContainer.style.display = 'none';
            this._SfOnboardingEntitiesContainer.style.display = 'none';
            this._SfOnboardingLocationsContainer.style.display = 'none';
            this._SfOnboardingFunctionsContainer.style.display = 'none';
            this._SfOnboardingTagsContainer.style.display = 'none';
            this._SfOnboardingReportersContainer.style.display = 'none';
            this._SfOnboardingApproversContainer.style.display = 'none';
            this._SfOnboardingFunctionHeadsContainer.style.display = 'none';
            this._SfOnboardingMakerCheckersContainer.style.display = 'none';
            this._SfOnboardingAuditorsContainer.style.display = 'none';
            this._SfOnboardingViewersContainer.style.display = 'none';
            this._SfOnboardingDocsContainer.style.display = 'none';
            this._SfOnboardingDuedatesContainer.style.display = 'none';
            this._SfOnboardingExtensionsContainer.style.display = 'none';
            this._SfOnboardingAlertSchedulesContainer.style.display = 'none';
            this._SfOnboardingActivationsContainer.style.display = 'none';
            this._SfOnboardingInvalidationsContainer.style.display = 'none';
            this._SfOnboardingTriggersContainer.style.display = 'none';
            this._SfOnboardingInternalControlsContainer.style.display = 'none';
            this._SfOnboardingSignoffContainer.style.display = 'none';
            this._SfOnboardingCalendarContainer.style.display = 'none';
            this._SfOnboardingStatutesContainer.innerHTML = '';
            this._SfOnboardingCompliancesContainer.innerHTML = '';
            this._SfOnboardingCountriesContainer.innerHTML = '';
            this._SfOnboardingEntitiesContainer.innerHTML = '';
            this._SfOnboardingLocationsContainer.innerHTML = '';
            this._SfOnboardingFunctionsContainer.innerHTML = '';
            this._SfOnboardingTagsContainer.innerHTML = '';
            this._SfOnboardingReportersContainer.innerHTML = '';
            this._SfOnboardingApproversContainer.innerHTML = '';
            this._SfOnboardingFunctionHeadsContainer.innerHTML = '';
            this._SfOnboardingMakerCheckersContainer.innerHTML = '';
            this._SfOnboardingAuditorsContainer.innerHTML = '';
            this._SfOnboardingViewersContainer.innerHTML = '';
            this._SfOnboardingDocsContainer.innerHTML = '';
            this._SfOnboardingDuedatesContainer.innerHTML = '';
            this._SfOnboardingExtensionsContainer.innerHTML = '';
            this._SfOnboardingAlertSchedulesContainer.innerHTML = '';
            this._SfOnboardingActivationsContainer.innerHTML = '';
            this._SfOnboardingInvalidationsContainer.innerHTML = '';
            this._SfOnboardingTriggersContainer.innerHTML = '';
            this._SfOnboardingInternalControlsContainer.innerHTML = '';
            this._SfOnboardingSignoffContainer.innerHTML = '';
            this._SfOnboardingCalendarContainer.innerHTML = '';
        };
        this.hideRcmTabContainers = async () => {
            this._SfRcmComplianceContainer.style.display = 'none';
            this._SfRcmProjectsContainer.style.display = 'none';
            this._SfRcmDateContainer.style.display = 'none';
            this._SfRcmConfirmContainer.style.display = 'none';
            this._SfRcmJobsContainer.style.display = 'none';
            this._SfRcmComplianceContainer.innerHTML = '';
            this._SfRcmProjectsContainer.innerHTML = '';
            this._SfRcmDateContainer.innerHTML = '';
            this._SfRcmConfirmContainer.innerHTML = '';
            this._SfRcmJobsContainer.innerHTML = '';
        };
        this.loadRcmNotifications = async () => {
            const notifs = await this.fetchRcmNotifications(this.projectId);
            //console.log('notifs', notifs);
            this.renderRcmNotifications(notifs);
        };
        this.loadRcmCompliances = async () => {
            var _a;
            this.hideRcmTabContainers();
            this._SfRcmComplianceContainer.style.display = 'flex';
            const compliances = [];
            var nextBackwardTokenOrig = '';
            const tempCompliances = [];
            while (true) {
                const updatedCompliances = await this.fetchUpdatedCompliances(nextBackwardTokenOrig);
                //console.log('updatedCompliances', updatedCompliances.data.length);
                const nextBackwardTokenNew = updatedCompliances.nextBackwardToken;
                //console.log('comparison', nextBackwardTokenNew, nextBackwardTokenOrig);
                if (nextBackwardTokenOrig == nextBackwardTokenNew) {
                    //console.log('breaking...');
                    break;
                }
                else {
                    nextBackwardTokenOrig = nextBackwardTokenNew;
                }
                for (var i = 0; i < updatedCompliances.data.length; i++) {
                    const event = JSON.parse(updatedCompliances.data[i].message);
                    //console.log(i, 'event op', JSON.parse(event.req.body).id);
                    if (event.op == "update") {
                        if (!tempCompliances.includes(JSON.parse(event.req.body).id)) {
                            compliances.push(JSON.parse(event.req.body));
                            tempCompliances.push(JSON.parse(event.req.body).id);
                        }
                    }
                }
                //console.log('compliances', compliances);
            }
            if (compliances.length > 0) {
                this.renderRcmCompliances(compliances);
                const arrCompliances = [];
                for (var i = 0; i < compliances.length; i++) {
                    arrCompliances.push(compliances[i].id);
                }
                //console.log('compliances 2', arrCompliances);
                const lockedCompliances = await this.fetchRcmLockedCompliances(arrCompliances);
                //console.log('compliances 2 locked', lockedCompliances);
                this.renderRcmLockedCompliances(lockedCompliances);
                (_a = this._SfRcmComplianceContainer.querySelector('#cb-completed')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
                    const cb = e.currentTarget;
                    if (cb.checked) {
                        this.renderRcmUnlockedCompliances(lockedCompliances);
                    }
                    else {
                        this.renderRcmLockedCompliances(lockedCompliances);
                    }
                });
                const arrButtons = this._SfRcmComplianceContainer.querySelectorAll('.buttonselect-icon');
                for (i = 0; i < arrButtons.length; i++) {
                    arrButtons[i].addEventListener('click', (e) => {
                        const id = e.currentTarget.id.replace('button-', '');
                        var index = -1;
                        for (var j = 0; j < compliances.length; j++) {
                            if (compliances[j].id == id) {
                                index = j;
                            }
                        }
                        //console.log(id, index, compliances[index]);
                        this.rcmSelectedCompliance = compliances[index];
                        this._SfRcmTabContainer.querySelector('#rcm-tab-projects').click();
                    });
                }
                const arrLockButtons = this._SfRcmComplianceContainer.querySelectorAll('.button-lock-icon');
                for (i = 0; i < arrLockButtons.length; i++) {
                    arrLockButtons[i].addEventListener('click', async (e) => {
                        const index = e.currentTarget.id.replace('button-lock-', '');
                        await this.fetchUpdateRcmLock(index);
                        this.loadRcmCompliances();
                    });
                }
            }
        };
        this.loadRcmProjects = async () => {
            //console.log('loadRcmProjects');
            this.hideRcmTabContainers();
            this._SfRcmProjectsContainer.style.display = 'flex';
            this.renderRcmSelectedComplianceInProject(this._SfRcmProjectsContainer);
            var mappedProjects;
            if (this.rcmSelectedCompliance != null) {
                mappedProjects = await this.fetchMappedProjects();
                //console.log('mappedProjects', mappedProjects.data);
            }
            const projects = [];
            if (mappedProjects != null) {
                for (var i = 0; i < mappedProjects.data.length; i++) {
                    const projectDetail = await this.fetchDetailProject(mappedProjects.data[i]['projectid']['S']);
                    projects.push(projectDetail.data.value);
                }
            }
            this.rcmSelectedProjects = projects;
            this.renderRcmProjects(this._SfRcmProjectsContainer, this.rcmSelectedProjects);
            if (this.rcmSelectedProjects != null && this.rcmSelectedProjects.length > 0) {
                this.renderRcmProceed(this._SfRcmProjectsContainer, this._SfRcmTabContainer.querySelector('#rcm-tab-date'));
            }
        };
        this.loadRcmDate = async () => {
            var _a, _b;
            //console.log('loadRcmDate');
            this.hideRcmTabContainers();
            this._SfRcmDateContainer.style.display = 'flex';
            this.renderRcmDate(this._SfRcmDateContainer);
            this.renderRcmSelectedComplianceInProject(this._SfRcmDateContainer);
            //console.log('projects', this.rcmSelectedProjects);
            this.renderRcmProjects(this._SfRcmDateContainer, this.rcmSelectedProjects);
            if (this.rcmSelectedProjects != null && this.rcmSelectedProjects.length > 0) {
                this.renderRcmProceed(this._SfRcmDateContainer, this._SfRcmTabContainer.querySelector('#rcm-tab-jobs'));
            }
            (_a = this._SfRcmDateContainer.querySelector('#rcm-date')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
                this.rcmSelectedDate = e.currentTarget.value;
                //console.log(this.rcmSelectedDate);
            });
            (_b = this._SfRcmDateContainer.querySelector('#rcm-message')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (e) => {
                this.rcmSelectedMessage = e.currentTarget.value;
                //console.log(this.rcmSelectedMessage);
            });
        };
        this.loadRcmJobs = async () => {
            var _a;
            //console.log('loadRcmJobs');
            this.hideRcmTabContainers();
            this._SfRcmJobsContainer.style.display = 'flex';
            if (this.rcmSelectedCompliance != null) {
                const jobs = await this.fetchRcmJobs(this.rcmSelectedCompliance.id);
                //console.log('jobs', jobs, this.rcmSelectedDate, this.rcmSelectedMessage); 
                if (this.rcmSelectedDate != null && this.rcmSelectedMessage != null) {
                    this.renderRcmJobs(this._SfRcmJobsContainer);
                    this.renderRcmSelectedDate(this._SfRcmJobsContainer);
                }
                this.renderRcmSelectedComplianceInProject(this._SfRcmJobsContainer);
                this.renderRcmProjects(this._SfRcmJobsContainer, this.rcmSelectedProjects);
                this.renderRcmSelectedJobs(this._SfRcmJobsContainer, jobs);
                //console.log('projects', this.rcmSelectedProjects);
                (_a = this._SfRcmJobsContainer.querySelector('#button-submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                    //console.log(this.rcmSelectedCompliance);
                    await this.fetchCreateRcmJob(this.rcmSelectedCompliance.id, this.rcmSelectedCompliance, this.rcmSelectedDate, this.rcmSelectedMessage, this.rcmSelectedProjects);
                    this.loadRcmJobs();
                });
            }
            else {
            }
        };
        this.loadOnboardingStatutes = async () => {
            this.hideTabContainers();
            this._SfOnboardingStatutesContainer.style.display = 'flex';
            const mappedStatutes = await this.fetchMappedStatutes();
            //console.log('mappedstatutes', mappedStatutes);
            this.renderOnboardingStatutes(mappedStatutes);
        };
        this.loadOnboardingCompliances = async () => {
            this.hideTabContainers();
            this._SfOnboardingCompliancesContainer.style.display = 'flex';
            const mappedStatutes = await this.fetchMappedStatutes();
            const mappedCompliances = await this.fetchMappedCompliances();
            this.renderOnboardingCompliances(mappedStatutes, mappedCompliances);
        };
        this.loadOnboardingCountries = async () => {
            this.hideTabContainers();
            this._SfOnboardingCountriesContainer.style.display = 'flex';
            const countriesJobs = await this.fetchCountriesJobs();
            const mappedCountries = await this.fetchMappedCountries();
            const mappedCompliances = await this.fetchMappedCompliances();
            // const mappedStatutes = await this.fetchMappedStatutes();
            //console.log('countriesJobs', countriesJobs);
            //console.log('mappedCompliances', mappedCompliances);
            //console.log('mappedCountries', mappedCountries);
            for (var i = 0; i < mappedCompliances.data.mappings.mappings.length; i++) {
                if (mappedCompliances.data.mappings.mappings[i].id == "33a0deab-e93e-41b7-831a-473f9ea3eea2") {
                    //console.log('uniqcol zero', mappedCompliances.data.mappings.mappings[i]);
                }
            }
            this.renderOnboardingCountries(mappedCountries, mappedCompliances, countriesJobs);
        };
        this.loadOnboardingEntities = async () => {
            this.hideTabContainers();
            this._SfOnboardingEntitiesContainer.style.display = 'flex';
            const entitiesJobs = await this.fetchEntitiesJobs();
            const mappedEntities = await this.fetchMappedEntities();
            const mappedSerializedCountries = await this.fetchMappedSerializedCountries();
            const arrStatuteEntitiesApplicabilities = await this.loadProposedFromStatutes(1);
            // const mappedStatutes = await this.fetchMappedStatutes();
            //console.log('mappedSerializedCountries', mappedSerializedCountries);
            //console.log('mappedEntities', mappedEntities);
            //console.log('entitiesApplicabilities', arrStatuteEntitiesApplicabilities);
            this.renderOnboardingEntities(mappedEntities, mappedSerializedCountries, entitiesJobs, arrStatuteEntitiesApplicabilities);
        };
        this.loadOnboardingLocations = async () => {
            this.hideTabContainers();
            this._SfOnboardingLocationsContainer.style.display = 'flex';
            const locationsJobs = await this.fetchLocationsJobs();
            const mappedSerializedEntities = await this.fetchMappedSerializedEntities();
            const mappedLocations = await this.fetchMappedLocations();
            //console.log('mappedserializedentities', mappedSerializedEntities);
            //console.log('mappedlocations', mappedLocations);
            this.renderOnboardingLocations(mappedLocations, mappedSerializedEntities, locationsJobs);
        };
        this.loadOnboardingFunctions = async () => {
            this.hideTabContainers();
            this._SfOnboardingFunctionsContainer.style.display = 'flex';
            const functionsJobs = await this.fetchFunctionJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedFunctions = await this.fetchMappedFunctions();
            //console.log('functionjobs', functionsJobs);
            //console.log('mappedserializedlocations', mappedSerializedLocations);
            //console.log('mappedfunctions', mappedFunctions);
            this.renderOnboardingFunctions(mappedFunctions, mappedSerializedLocations, functionsJobs);
        };
        this.loadOnboardingTags = async () => {
            this.hideTabContainers();
            this._SfOnboardingTagsContainer.style.display = 'flex';
            const tagsJobs = await this.fetchTagsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedTags = await this.fetchMappedTags();
            //console.log('mappedSerializedLocations', mappedSerializedLocations);
            //console.log('mappedtags', mappedTags);
            this.renderOnboardingTags(mappedTags, mappedSerializedLocations, tagsJobs);
        };
        this.loadProposedFromStatutes = async (fieldIndex) => {
            const mappedStatutes = await this.fetchMappedStatutes();
            //console.log('mappedstatutes', mappedStatutes);
            const arrStatuteReporters = {};
            for (var i = 0; i < mappedStatutes.data.mappings.mappings.length; i++) {
                if (arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname] == null) {
                    arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname] = {};
                }
                if (arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname][mappedStatutes.data.mappings.mappings[i].statutename.trim()] == null) {
                    arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname][mappedStatutes.data.mappings.mappings[i].statutename.trim()] = {};
                }
                arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname][mappedStatutes.data.mappings.mappings[i].statutename.trim()] = mappedStatutes.data.mappings.mappings[i].extraFields[fieldIndex];
            }
            //console.log('mappedstatutesend', arrStatuteReporters);
            return arrStatuteReporters;
        };
        this.loadOnboardingReporters = async () => {
            this.hideTabContainers();
            this._SfOnboardingReportersContainer.style.display = 'flex';
            const reportersJobs = await this.fetchReportersJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedReporters = await this.fetchMappedReporters();
            // const arrStatuteReporters = await this.loadProposedFromStatutes(1);
            //console.log('mappedSerializedLocations', mappedSerializedLocations);
            //console.log('mappedreporters', mappedReporters);
            //console.log('arrstatutereporters', arrStatuteReporters);
            this.renderOnboardingReporters(mappedReporters, mappedSerializedLocations, reportersJobs, null);
        };
        this.loadOnboardingApprovers = async () => {
            this.hideTabContainers();
            this._SfOnboardingApproversContainer.style.display = 'flex';
            const approversJobs = await this.fetchApproversJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedApprovers = await this.fetchMappedApprovers();
            // const arrStatuteApprovers = await this.loadProposedFromStatutes(2);
            //console.log('mappedserializedlocations', mappedSerializedLocations);
            //console.log('mappedapprovers', mappedApprovers);
            this.renderOnboardingApprovers(mappedApprovers, mappedSerializedLocations, approversJobs, null);
        };
        this.loadOnboardingFunctionHeads = async () => {
            this.hideTabContainers();
            this._SfOnboardingFunctionHeadsContainer.style.display = 'flex';
            const functionHeadsJobs = await this.fetchFunctionHeadsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedFunctionHeads = await this.fetchMappedFunctionHeads();
            // const arrStatuteFunctionheads = await this.loadProposedFromStatutes(3);
            //console.log('mappedserializedlocations', mappedSerializedLocations);
            //console.log('mappedfunctionheads', mappedFunctionHeads);
            this.renderOnboardingFunctionHeads(mappedFunctionHeads, mappedSerializedLocations, functionHeadsJobs, null);
        };
        this.loadOnboardingViewers = async () => {
            this.hideTabContainers();
            this._SfOnboardingViewersContainer.style.display = 'flex';
            const makerViewersJobs = await this.fetchViewersJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedViewers = await this.fetchMappedViewers();
            // const arrStatuteViewers = await this.loadProposedFromStatutes(5);
            //console.log('mappedSerializedLocations', mappedSerializedLocations);
            //console.log('mappedViewers', mappedViewers);
            this.renderOnboardingViewers(mappedViewers, mappedSerializedLocations, makerViewersJobs, null);
        };
        this.loadOnboardingDocs = async () => {
            this.hideTabContainers();
            this._SfOnboardingDocsContainer.style.display = 'flex';
            const docsJobs = await this.fetchDocsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedDocs = await this.fetchMappedDocs();
            //console.log('mappedSerializedLocations', mappedSerializedLocations);
            //console.log('mappedDocs', mappedDocs);
            this.renderOnboardingDocs(mappedDocs, mappedSerializedLocations, docsJobs);
        };
        this.loadOnboardingMakerCheckers = async () => {
            this.hideTabContainers();
            this._SfOnboardingMakerCheckersContainer.style.display = 'flex';
            const makerCheckersJobs = await this.fetchMakerCheckersJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedMakerCheckers = await this.fetchMappedMakerCheckers();
            //console.log('mappedSerializedLocations', mappedSerializedLocations);
            //console.log('mappedMakerCheckers', mappedMakerCheckers);
            this.renderOnboardingMakerCheckers(mappedMakerCheckers, mappedSerializedLocations, makerCheckersJobs);
        };
        this.loadOnboardingAuditors = async () => {
            this.hideTabContainers();
            this._SfOnboardingAuditorsContainer.style.display = 'flex';
            const auditorsJobs = await this.fetchAuditorsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedAuditors = await this.fetchMappedAuditors();
            // const arrStatuteAuditors = await this.loadProposedFromStatutes(4);
            //console.log('mappedSerializedFunctionheads', mappedSerializedLocations);
            //console.log('mappedAuditors', mappedAuditors);
            this.renderOnboardingAuditors(mappedAuditors, mappedSerializedLocations, auditorsJobs, null);
        };
        this.loadOnboardingDuedates = async () => {
            this.hideTabContainers();
            this._SfOnboardingDuedatesContainer.style.display = 'flex';
            const duedatesJobs = await this.fetchDueDatesJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedDuedates = await this.fetchMappedDuedates();
            //console.log('mappedSerializedLocations', mappedSerializedLocations);
            //console.log('mappedduedates', mappedDuedates);
            this.renderOnboardingDuedates(mappedDuedates, mappedSerializedLocations, duedatesJobs);
        };
        this.loadOnboardingActivations = async () => {
            this.hideTabContainers();
            this._SfOnboardingActivationsContainer.style.display = 'flex';
            const activationsJobs = await this.fetchExtensionsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedActivations = await this.fetchMappedActivations();
            //console.log('mappedserializedlocations', mappedSerializedLocations);
            //console.log('mappedactivations', mappedActivations);
            this.renderOnboardingActivations(mappedActivations, mappedSerializedLocations, activationsJobs);
        };
        this.loadOnboardingInvalidations = async () => {
            this.hideTabContainers();
            this._SfOnboardingInvalidationsContainer.style.display = 'flex';
            const invalidationsJobs = await this.fetchExtensionsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedInvalidations = await this.fetchMappedInvalidations();
            //console.log('mappedserializedlocations', mappedSerializedLocations);
            //console.log('mappedinvalidations', mappedInvalidations);
            this.renderOnboardingInvalidations(mappedInvalidations, mappedSerializedLocations, invalidationsJobs);
        };
        this.loadOnboardingAlertSchedules = async () => {
            this.hideTabContainers();
            this._SfOnboardingAlertSchedulesContainer.style.display = 'flex';
            const alertschedulesJobs = await this.fetchAlertSchedulesJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedAlertSchedules = await this.fetchMappedAlertSchedules();
            //console.log('mappedserializedlocations', mappedSerializedLocations);
            //console.log('mappedalertschedules', mappedAlertSchedules);
            this.renderOnboardingAlertSchedules(mappedAlertSchedules, mappedSerializedLocations, alertschedulesJobs);
        };
        this.loadOnboardingExtensions = async () => {
            this.hideTabContainers();
            this._SfOnboardingExtensionsContainer.style.display = 'flex';
            const extensionsJobs = await this.fetchExtensionsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedExtensions = await this.fetchMappedExtensions();
            //console.log('mappedserializedlocations', mappedSerializedLocations);
            //console.log('mappedextensions', mappedExtensions);
            this.renderOnboardingExtensions(mappedExtensions, mappedSerializedLocations, extensionsJobs);
        };
        this.loadOnboardingTriggers = async () => {
            this.hideTabContainers();
            this._SfOnboardingTriggersContainer.style.display = 'flex';
            // const triggersJobs = await this.fetchInternalControlsJobs();
            // const mappedSerializedAlertSchedules = await this.fetchMappedSerializedAlertSchedules();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedTriggers = await this.fetchMappedTriggers();
            //console.log('mappedSerializedAlertSchedules', mappedSerializedAlertSchedules);
            //console.log('mappedTriggers', mappedTriggers);
            this.renderOnboardingTriggers(mappedTriggers, mappedSerializedLocations, null);
        };
        this.loadOnboardingInternalControls = async () => {
            this.hideTabContainers();
            this._SfOnboardingInternalControlsContainer.style.display = 'flex';
            const internalcontrolsJobs = await this.fetchInternalControlsJobs();
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedInternalControls = await this.fetchMappedInternalControls();
            //console.log('mappedSerializedlocations', mappedSerializedLocations);
            //console.log('mappedinternalcontrols', mappedInternalControls);
            this.renderOnboardingInternalControls(mappedInternalControls, mappedSerializedLocations, internalcontrolsJobs);
        };
        this.loadOnboardingSignoff = async () => {
            this.hideTabContainers();
            this._SfOnboardingSignoffContainer.style.display = 'flex';
            const signoff = await this.fetchGetSignOff();
            this.renderOnboardingSignoff(signoff);
            //console.log(signoff);
        };
        this.loadOnboardingCalendar = async () => {
            this.hideTabContainers();
            this._SfOnboardingCalendarContainer.style.display = 'flex';
            const calendarJobs = await this.fetchCalendarJobs();
            this.renderOnboardingCalendar(calendarJobs);
        };
        this.calculateStartAndEndDateOfPast = (index = 0) => {
            //console.log('calculating start and end of past');
            let block = 10;
            if (index === 0) {
                block = 10;
            }
            else {
                block = 30;
            }
            let nowMonth = new Date().getMonth() + 1;
            let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
            let nowDate = new Date(nowYear, new Date().getMonth(), new Date().getDate());
            let currDay = nowDate;
            for (var i = 0; i < block; i++) {
                currDay.setDate(currDay.getDate() - 1);
            }
            const startDate = ("0" + (currDay.getMonth() + 1)).slice(-2) + "/" + ("0" + (currDay.getDate() + 1)).slice(-2) + "/" + currDay.getFullYear();
            // currDay = new Date();
            currDay = nowDate;
            for (var i = 0; i < block; i++) {
                currDay.setDate(currDay.getDate() + 1);
            }
            const endDate = ("0" + (currDay.getMonth() + 1)).slice(-2) + "/" + ("0" + (currDay.getDate() + 1)).slice(-2) + "/" + currDay.getFullYear();
            return { startDate: startDate, endDate: endDate };
        };
        this.calculateStartAndEndDateOfThis = (index = 0) => {
            //console.log('calculating start and end of this');
            let block = 10;
            var firstDate = new Date();
            firstDate = new Date(parseInt(this.getCurrentYear((firstDate.getMonth() + 1) + "")), firstDate.getMonth(), firstDate.getDate());
            if (index === 0) {
                let nowMonth = new Date().getMonth() + 1;
                let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
                let nowDate = new Date(nowYear, new Date().getMonth(), new Date().getDate());
                firstDate = this.getFirstDateOfWeek(nowDate);
                //console.log('this first date', firstDate);
                block = 10;
            }
            if (index === 1) {
                let nowMonth = new Date().getMonth() + 1;
                let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
                firstDate = new Date(nowYear, new Date().getMonth(), 1);
                //console.log('this first date', firstDate);
                block = 35;
            }
            let sDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
            let eDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());
            for (var i = 0; i < block; i++) {
                eDate.setDate(eDate.getDate() + 1);
            }
            return { startDate: (sDate.getMonth() + 1) + '/' + sDate.getDate() + '/' + sDate.getFullYear(), endDate: (eDate.getMonth() + 1) + '/' + eDate.getDate() + '/' + eDate.getFullYear() };
        };
        this.calculateStartAndEndDateOfUpcoming = (index = 0) => {
            //console.log('calculating start and end of upcoming');
            let nowMonth = new Date().getMonth() + 1;
            let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
            let currDate = new Date();
            let sDate = new Date(nowYear, currDate.getMonth(), currDate.getDate());
            sDate.setDate(sDate.getDate() - 1);
            let block = 10;
            if (index === 0) {
                block = 8;
            }
            else if (index === 1) {
                block = 32;
            }
            else {
                block = 92;
            }
            let eDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());
            for (var i = 0; i < block; i++) {
                eDate.setDate(eDate.getDate() + 1);
            }
            return { startDate: (sDate.getMonth() + 1) + '/' + sDate.getDate() + '/' + sDate.getFullYear(), endDate: (eDate.getMonth() + 1) + '/' + eDate.getDate() + '/' + eDate.getFullYear() };
        };
        this.calculateStartAndEndDateOfStream = (index = 0) => {
            let month = parseInt(this.calendarStartMM);
            //console.log('calculateStartAndEndDateOfStream', index, month);
            for (var j = 0; j < 12; j++) {
                if (j === index) {
                    let currentMonth = month;
                    let nowMonth = new Date().getMonth() + 1;
                    //let nowYear = new Date().getFullYear();
                    let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
                    let lastMonth = -1;
                    let nextMonth = -1;
                    let lastMonthsYear = -1;
                    let nextMonthsYear = -1;
                    if (currentMonth === 1) {
                        // Mar
                        lastMonth = 12;
                        nextMonth = 2;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear + 1;
                        }
                    }
                    if (currentMonth === 2) {
                        // Mar
                        lastMonth = 1;
                        nextMonth = 3;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                        else {
                            lastMonthsYear = nowYear + 1;
                            nextMonthsYear = nowYear + 1;
                        }
                    }
                    if (currentMonth === 3) {
                        // Mar
                        lastMonth = 2;
                        nextMonth = 4;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                        else {
                            lastMonthsYear = nowYear + 1;
                            nextMonthsYear = nowYear + 1;
                        }
                    }
                    if (currentMonth === 4) {
                        // Mar
                        lastMonth = 3;
                        nextMonth = 5;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 5) {
                        // Mar
                        lastMonth = 4;
                        nextMonth = 6;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 6) {
                        // Mar
                        lastMonth = 5;
                        nextMonth = 7;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 7) {
                        // Mar
                        lastMonth = 6;
                        nextMonth = 8;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 8) {
                        // Mar
                        lastMonth = 7;
                        nextMonth = 9;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 9) {
                        // Mar
                        lastMonth = 8;
                        nextMonth = 10;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 10) {
                        // Mar
                        lastMonth = 9;
                        nextMonth = 11;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 11) {
                        // Mar
                        lastMonth = 10;
                        nextMonth = 12;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear - 1;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear;
                        }
                    }
                    if (currentMonth === 12) {
                        // Mar
                        lastMonth = 11;
                        nextMonth = 1;
                        if (nowMonth < parseInt(this.calendarStartMM)) {
                            lastMonthsYear = nowYear - 1;
                            nextMonthsYear = nowYear;
                        }
                        else {
                            lastMonthsYear = nowYear;
                            nextMonthsYear = nowYear + 1;
                        }
                    }
                    // //console.log('calculateStartAndEndDateOfStream', currentMonth, index);
                    // if(currentMonth <= 11 && currentMonth >= 2) {
                    //   lastMonth = parseInt(((currentMonth - 1) + "").slice(-2));
                    //   nextMonth = parseInt(((currentMonth + 1) + "").slice(-2));
                    // } else if(currentMonth === 12) {
                    //   lastMonth = 11;
                    //   nextMonth = 1;
                    // } else if(currentMonth === 1) {
                    //   lastMonth = 12;
                    //   nextMonth = 2;
                    // }
                    // //console.log('last month', lastMonth);
                    // //console.log('next month', nextMonth, this.calendarStartMM);
                    // // let lastMonthsYear = -1;
                    // // let nextMonthsYear = -1;
                    // if((lastMonth) >= parseInt(this.calendarStartMM)) {
                    //   lastMonthsYear = parseInt(this.calendarStartYYYY);
                    // } else {
                    //   if(j === 0) {
                    //     lastMonthsYear = parseInt(this.calendarStartYYYY);
                    //   } else {
                    //     lastMonthsYear = parseInt(this.calendarStartYYYY) + 1;
                    //   }
                    // }
                    // if((nextMonth) >= parseInt(this.calendarStartMM)) {
                    //   nextMonthsYear = parseInt(this.calendarStartYYYY);
                    // } else {
                    //   nextMonthsYear = parseInt(this.calendarStartYYYY) + 1;
                    // }
                    let startDate = lastMonth + "/25/" + lastMonthsYear;
                    let endDate = nextMonth + "/01/" + nextMonthsYear;
                    return { startDate: startDate, endDate: endDate };
                }
                else {
                    if (month === 12) {
                        month = 1;
                    }
                    else {
                        month++;
                    }
                }
            }
            return null;
        };
        this.renderAdhocConfirmed = async (adhocQuestions, render) => {
            for (var i = 0; i < Object.keys(adhocQuestions).length; i++) {
                const radioYes = this._SfAdhocContainer.querySelector('#radio-yes-' + i);
                console.log(radioYes.checked);
                if (render) {
                    if (!radioYes.checked) {
                        const divQuestion = this._SfAdhocContainer.querySelector('#adhoc-question-' + i);
                        if (divQuestion != null) {
                            console.log('divQuestion', divQuestion, render, divQuestion.classList);
                            if (!divQuestion.classList.contains('hide')) {
                                divQuestion.classList.add('hide');
                            }
                        }
                    }
                }
                else {
                    if (!radioYes.checked) {
                        const divQuestion = this._SfAdhocContainer.querySelector('#adhoc-question-' + i);
                        if (divQuestion != null) {
                            console.log('divQuestion', divQuestion, render, divQuestion.classList);
                            if (divQuestion.classList.contains('hide')) {
                                divQuestion.classList.remove('hide');
                            }
                        }
                    }
                }
            }
        };
        this.renderAdhoc = async () => {
            var _a, _b, _c;
            var html = '';
            html += '<div part="stream-event-list" class="p-10 w-100" id="adhoc-list">';
            html += 'Loading ...';
            html += '</div>';
            this._SfAdhocContainer.innerHTML = html;
            const resultAdhoc = await this.fetchAdhoc();
            const adhocQuestions = {};
            for (var i = 0; i < resultAdhoc.data.events["00/00"].length; i++) {
                if (resultAdhoc.data.events["00/00"][i]['adhocquestion'] != null && resultAdhoc.data.events["00/00"][i]['adhocquestion'].length > 0) {
                    if (adhocQuestions[resultAdhoc.data.events["00/00"][i]['adhocquestion'][0].trim()] == null) {
                        adhocQuestions[resultAdhoc.data.events["00/00"][i]['adhocquestion'][0].trim()] = [];
                    }
                    adhocQuestions[resultAdhoc.data.events["00/00"][i]['adhocquestion'][0].trim()].push(resultAdhoc.data.events["00/00"][i]);
                }
            }
            console.log('adhocQuestions', adhocQuestions);
            html = '';
            const arrAllTriggerIds = {};
            for (i = 0; i < Object.keys(adhocQuestions).length; i++) {
                // const firstCompliance = adhocQuestions[Object.keys(adhocQuestions)[i]][0];
                // console.log('triggers', i, '=' + firstCompliance.triggers + '=');
                // const firstComplianceTriggers = firstCompliance.triggers == null ? [] : firstCompliance.triggers == "" ? [] : JSON.parse(firstCompliance.triggers);
                html += '<div part="stream-event-selected" id="adhoc-question-' + i + '" class="pl-10 pr-10 pb-20 mb-10">';
                html += '<h3 part="results-title" class="mb-0">' + Object.keys(adhocQuestions)[i] + '</h3>';
                html += '<button part="adhoc-compliance-list-count-not-selected" id="compliance-count-' + i + '" class="compliance-count mb-20 mt-10" part="text-view">' + adhocQuestions[Object.keys(adhocQuestions)[i]].length + ' compliance(s) associated</button><br />';
                html += '<div id="compliance-list-body-' + i + '" class="hide">';
                html += '<table class="mb-20">';
                html += '<tr>';
                html += '<td part="td-head">ComplianceId</td><td part="td-head">Location</td><td part="td-head">Obligation</td>';
                html += '</tr>';
                for (var j = 0; j < adhocQuestions[Object.keys(adhocQuestions)[i]].length; j++) {
                    const compliance = adhocQuestions[Object.keys(adhocQuestions)[i]][j];
                    html += '<tr>';
                    html += ('<td part="td-body"><sf-i-elastic-text text="' + compliance.id + '" minLength="10" lineSize="6"></sf-i-elastic-text></td><td part="td-body"><sf-i-elastic-text text="' + compliance.locationname.replace(/ *\([^)]*\) */g, "").trim() + '" minLength="80" lineSize="6"></sf-i-elastic-text></td><td part="td-body"><sf-i-elastic-text text="' + compliance.obligation + '" minLength="80" lineSize="6"></sf-i-elastic-text></td>');
                    html += '</tr>';
                }
                html += '</table>';
                html += '</div>';
                html += '<div>';
                html += '<input type="radio" name="my-radio-group-' + i + '" id="radio-no-' + i + '" value="no" checked/><label for="radio-no-' + i + '">No</label>&nbsp;&nbsp;<input type="radio" name="my-radio-group-' + i + '" id="radio-yes-' + i + '" value="yes" /><label for="radio-yes-' + i + '">Yes</label>';
                html += '</div>';
                html += '<div id="choose-date-' + i + '" class="mb-20 mt-20 hide">';
                html += ('<label part="input-label">Date of occurrence</label><br />');
                html += ('<input part="input" id="date-of-occurrence-' + i + '" type="date" style="margin-left: 0; margin-right: 0; padding: 0" /><br />');
                html += '<div class="mb-20"></div>';
                html += ('<label part="input-label">Remarks</label><br />');
                html += ('<textarea part="input" id="remarks-' + i + '" style="margin: 0; padding: 0"></textarea><br />');
                if (this.locationId != "") {
                    html += ('<label part="td-head">Will be triggered for this location</label>');
                }
                else if (this.entityId != "") {
                    html += ('<label part="td-head">Will be triggered for all locations of this entity</label>');
                }
                else if (this.countryId != "") {
                    html += ('<label part="td-head">Will be triggered for all locations of this country</label>');
                }
                html += '</div>';
                let arrTriggerIds = [];
                let arrTriggerRemarks = [];
                let arrTriggers = {};
                for (var j = 0; j < adhocQuestions[Object.keys(adhocQuestions)[i]].length; j++) {
                    const compliance = adhocQuestions[Object.keys(adhocQuestions)[i]][j];
                    const locationname = compliance.locationname;
                    const complianceTriggers = compliance.triggers == null ? [] : compliance.triggers == "" ? [] : JSON.parse(compliance.triggers);
                    console.log('complianceTriggers', complianceTriggers);
                    for (var k = 0; k < complianceTriggers.length; k++) {
                        const triggerDate = complianceTriggers[k].triggerDate;
                        const occurrenceDate = complianceTriggers[k].occurrenceDate;
                        const complianceId = complianceTriggers[k].complianceId;
                        const triggerId = complianceTriggers[k].triggerId;
                        const remarks = complianceTriggers[k].remarks;
                        const triggerdd = triggerDate.split('/')[0];
                        const triggermm = triggerDate.split('/')[1];
                        const triggeryyyy = triggerDate.split('/')[2];
                        const tsTrigger = (new Date(triggeryyyy, parseInt(triggermm) - 1, triggerdd) + "").split(" ");
                        const dateTrigger = (tsTrigger[0] + " " + tsTrigger[1] + " " + tsTrigger[2] + " " + tsTrigger[3]);
                        const occurrencedd = occurrenceDate.split('/')[0];
                        const occurrencemm = occurrenceDate.split('/')[1];
                        const occurrenceyyyy = occurrenceDate.split('/')[2];
                        const tsOccurrence = (new Date(occurrenceyyyy, parseInt(occurrencemm) - 1, occurrencedd) + "").split(" ");
                        const dateOccurrence = (tsOccurrence[0] + " " + tsOccurrence[1] + " " + tsOccurrence[2] + " " + tsOccurrence[3]);
                        console.log('triggerId', triggerId);
                        if (!arrTriggerIds.includes(triggerId)) {
                            arrTriggerIds.push(triggerId);
                            arrTriggerRemarks.push(remarks);
                        }
                        if (arrTriggers[triggerId] == null) {
                            arrTriggers[triggerId] = {};
                        }
                        if (arrTriggers[triggerId][dateTrigger] == null) {
                            arrTriggers[triggerId][dateTrigger] = {};
                        }
                        if (arrTriggers[triggerId][dateTrigger][locationname] == null) {
                            arrTriggers[triggerId][dateTrigger][locationname] = {};
                        }
                        if (arrTriggers[triggerId][dateTrigger][locationname][complianceId] == null) {
                            arrTriggers[triggerId][dateTrigger][locationname][complianceId] = dateOccurrence;
                        }
                    }
                }
                arrAllTriggerIds[i] = arrTriggerIds;
                if (arrTriggerIds.length > 0) {
                    html += '<div class="mt-20 pt-10">';
                    html += ('<label part="adhoc-previous-triggers-count-not-selected" id="previous-triggers-' + i + '" class="mb-10">Previous Triggers (' + arrTriggerIds.length + ')</label><br />');
                    html += '</div>';
                }
                html += '<div id="previous-triggers-body-' + i + '" class="hide">';
                for (var j = 0; j < arrTriggerIds.length; j++) {
                    html += '<div class="d-flex align-center mt-20">';
                    html += '<span class="badge-counter" part="badge-counter">' + (j + 1) + '</span>';
                    html += '<div part="results-title"><sf-i-elastic-text text="' + arrTriggerRemarks[j] + '" minLength="40"></sf-i-elastic-text></div>';
                    html += '</div>';
                    html += '<div part="td-body" class="d-flex align-center">';
                    html += '<div>Trigger Id: </div>&nbsp;&nbsp;<sf-i-elastic-text text="' + arrTriggerIds[j] + '" minLength="10" lineSize="6"></sf-i-elastic-text>&nbsp;&nbsp; <button id="adhoc-delete-start-' + i + '-' + j + '"  class="mr-10">Retract</button><button id="adhoc-delete-cancel-' + i + '-' + j + '" class="mr-10 hide">Cancel</button><button id="adhoc-delete-confirm-' + i + '-' + j + '" class="mr-10 hide">Confirm Retract</button>';
                    html += '</div>';
                    for (var k = 0; k < Object.keys(arrTriggers[arrTriggerIds[j]]).length; k++) {
                        const dateTrigger = Object.keys(arrTriggers[arrTriggerIds[j]])[k];
                        for (var l = 0; l < Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger]).length; l++) {
                            const locationTrigger = Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger])[l];
                            for (var m = 0; m < Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger][locationTrigger]).length; m++) {
                                const complianceTrigger = Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger][locationTrigger])[m];
                                const dateOccurrence = arrTriggers[arrTriggerIds[j]][dateTrigger][locationTrigger][complianceTrigger];
                                html += '<div part="td-head" class="d-flex align-center ml-10">';
                                html += '<div>Occurred on&nbsp;&nbsp;' + dateOccurrence + ',&nbsp;&nbsp;Triggered on&nbsp;&nbsp;' + dateTrigger + '&nbsp;&nbsp;at&nbsp;&nbsp;' + locationTrigger.replace(/ *\([^)]*\) */g, "").trim() + '&nbsp;&nbsp;for Compliance Id&nbsp;&nbsp;</div><sf-i-elastic-text text="' + complianceTrigger + '" minLength="10" lineSize="6"></sf-i-elastic-text>';
                                html += '</div>';
                            }
                        }
                    }
                }
                html += '</div>';
                html += '</div>';
            }
            html += '<div class="d-flex justify-end w-100" style="position: fixed; bottom: 70px; left: 0px;">';
            html += '<button part="button-lg-short" id="radio-submit" class="d-flex align-center mt-10 pt-10 pb-10 mr-10 ml-10"><span class="material-symbols-outlined">bolt</span>&nbsp;<span>Trigger</span></button>';
            html += '<button part="button-lg-short-secondary" id="radio-submit-cancel" class="d-flex align-center mt-10 pt-10 pb-10 hide mr-10"><span class="material-symbols-outlined">close</span>&nbsp;<span>Cancel</span></button>';
            html += '<button part="button-lg-short" id="radio-submit-confirm" class="d-flex align-center mt-10 mr-10 pt-10 pb-10 hide"><span class="material-symbols-outlined">check</span>&nbsp;<span>Confirm</span></button>';
            html += '</div>';
            if (Object.keys(adhocQuestions).length === 0) {
                html = '<div class="d-flex justify-center mt-20 mb-20"><div part="results-title">No records found</div></div>';
            }
            this._SfAdhocContainer.querySelector('#adhoc-list').innerHTML = html;
            for (i = 0; i < Object.keys(adhocQuestions).length; i++) {
                const firstCompliance = adhocQuestions[Object.keys(adhocQuestions)[i]][0];
                const firstComplianceTriggers = firstCompliance.triggers == null ? [] : firstCompliance.triggers == "" ? [] : JSON.parse(firstCompliance.triggers);
                for (var j = 0; j < firstComplianceTriggers.length; j++) {
                    (_a = this._SfAdhocContainer.querySelector('#adhoc-delete-start-' + i + '-' + j)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
                        const _id = e.currentTarget.id;
                        const _i = _id.split('-')[3];
                        const _j = _id.split('-')[4];
                        this._SfAdhocContainer.querySelector('#adhoc-delete-start-' + _i + '-' + _j).classList.add('hide');
                        this._SfAdhocContainer.querySelector('#adhoc-delete-cancel-' + _i + '-' + _j).classList.remove('hide');
                        this._SfAdhocContainer.querySelector('#adhoc-delete-confirm-' + _i + '-' + _j).classList.remove('hide');
                    });
                    (_b = this._SfAdhocContainer.querySelector('#adhoc-delete-cancel-' + i + '-' + j)) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
                        const _id = e.currentTarget.id;
                        const _i = _id.split('-')[3];
                        const _j = _id.split('-')[4];
                        this._SfAdhocContainer.querySelector('#adhoc-delete-start-' + _i + '-' + _j).classList.remove('hide');
                        this._SfAdhocContainer.querySelector('#adhoc-delete-cancel-' + _i + '-' + _j).classList.add('hide');
                        this._SfAdhocContainer.querySelector('#adhoc-delete-confirm-' + _i + '-' + _j).classList.add('hide');
                    });
                    (_c = this._SfAdhocContainer.querySelector('#adhoc-delete-confirm-' + i + '-' + j)) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async (e) => {
                        const _id = e.currentTarget.id;
                        const _i = _id.split('-')[3];
                        const _j = _id.split('-')[4];
                        const untrigger = {
                            projectid: this.projectId,
                            triggerid: arrAllTriggerIds[_i][_j]
                        };
                        console.log('untrigger', untrigger);
                        await this.uploadUnTriggerEvent(untrigger);
                        this.renderAdhoc();
                    });
                }
            }
            for (i = 0; i < Object.keys(adhocQuestions).length; i++) {
                const radioYes = this._SfAdhocContainer.querySelector('#radio-yes-' + i);
                radioYes.addEventListener('click', (e) => {
                    const id = e.currentTarget.id.split('-')[2];
                    const chooseDate = this._SfAdhocContainer.querySelector('#choose-date-' + id);
                    console.log(chooseDate);
                    chooseDate.classList.remove('hide');
                });
                const radioNo = this._SfAdhocContainer.querySelector('#radio-no-' + i);
                radioNo.addEventListener('click', (e) => {
                    const id = e.currentTarget.id.split('-')[2];
                    const chooseDate = this._SfAdhocContainer.querySelector('#choose-date-' + id);
                    console.log(chooseDate);
                    chooseDate.classList.add('hide');
                });
            }
            for (i = 0; i < Object.keys(adhocQuestions).length; i++) {
                const complianceCount = this._SfAdhocContainer.querySelector('#compliance-count-' + i);
                complianceCount.addEventListener('click', (e) => {
                    const index = e.currentTarget.id.split('-')[2];
                    console.log(index);
                    const body = this._SfAdhocContainer.querySelector('#compliance-list-body-' + index);
                    if (body.classList.contains('hide')) {
                        body.classList.remove('hide');
                        e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-selected');
                    }
                    else {
                        body.classList.add('hide');
                        e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-not-selected');
                    }
                });
            }
            for (i = 0; i < Object.keys(adhocQuestions).length; i++) {
                const previousTriggerCount = this._SfAdhocContainer.querySelector('#previous-triggers-' + i);
                if (previousTriggerCount != null) {
                    previousTriggerCount.addEventListener('click', (e) => {
                        const index = e.currentTarget.id.split('-')[2];
                        console.log(index);
                        const body = this._SfAdhocContainer.querySelector('#previous-triggers-body-' + index);
                        if (body.classList.contains('hide')) {
                            body.classList.remove('hide');
                            e.currentTarget.setAttribute('part', 'adhoc-previous-triggers-count-selected');
                        }
                        else {
                            body.classList.add('hide');
                            e.currentTarget.setAttribute('part', 'adhoc-previous-triggers-count-not-selected');
                        }
                    });
                }
                // complianceCount.addEventListener('click', (e:any) => {
                //   const index = e.currentTarget.id.split('-')[2];
                //   console.log(index);
                //   const body = (this._SfAdhocContainer as HTMLDivElement).querySelector('#compliance-list-body-'+index) as HTMLDivElement;
                //   if(body.classList.contains('hide')) {
                //     body.classList.remove('hide');
                //     e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-selected')
                //   } else {
                //     body.classList.add('hide');
                //     e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-not-selected')
                //   }
                // });
            }
            const submitButtonCancel = this._SfAdhocContainer.querySelector('#radio-submit-cancel');
            if (submitButtonCancel != null) {
                submitButtonCancel.addEventListener('click', () => {
                    if (submitButtonConfirm != null && !submitButtonConfirm.classList.contains('hide')) {
                        submitButtonConfirm.classList.add('hide');
                    }
                    if (submitButtonCancel != null && !submitButtonCancel.classList.contains('hide')) {
                        submitButtonCancel.classList.add('hide');
                    }
                    if (submitButton != null && submitButton.classList.contains('hide')) {
                        submitButton.classList.remove('hide');
                    }
                    this.renderAdhocConfirmed(adhocQuestions, false);
                });
            }
            const submitButtonConfirm = this._SfAdhocContainer.querySelector('#radio-submit-confirm');
            if (submitButtonConfirm != null) {
                submitButtonConfirm.addEventListener('click', async () => {
                    let triggeredCompliances = [];
                    var submitFlag = true;
                    for (i = 0; i < Object.keys(adhocQuestions).length; i++) {
                        const radioYes = this._SfAdhocContainer.querySelector('#radio-yes-' + i);
                        console.log(radioYes.checked);
                        if (radioYes.checked) {
                            const compliances = adhocQuestions[Object.keys(adhocQuestions)[i]];
                            // const chooseDate = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#choose-date-'+i) as HTMLDivElement)
                            const chooseDateInput = this._SfAdhocContainer.querySelector('#date-of-occurrence-' + i);
                            const remarksInput = this._SfAdhocContainer.querySelector('#remarks-' + i);
                            const dateOfTrigger = (new Date().getDate() + "").slice(-2) + "/" + ((new Date().getMonth() + 1) + "").slice(-2) + "/" + (new Date().getFullYear() + "");
                            const dateOfOccurrence = chooseDateInput.value;
                            const remarks = remarksInput.value;
                            if (dateOfOccurrence == "") {
                                chooseDateInput.setAttribute('style', 'border:solid 2px ' + this.COLOR_REJECTED + ' !important');
                                submitFlag = false;
                            }
                            if (remarks == "") {
                                remarksInput.setAttribute('style', 'border:solid 2px ' + this.COLOR_REJECTED + ' !important');
                                submitFlag = false;
                            }
                            if (submitFlag) {
                                triggeredCompliances.push({
                                    compliances: compliances,
                                    dateOfOccurrence: dateOfOccurrence,
                                    dateOfTrigger: dateOfTrigger,
                                    locationId: this.locationId,
                                    entityId: this.entityId,
                                    countryId: this.countryId,
                                    tagId: this.tagId,
                                    remarks: remarks,
                                });
                                chooseDateInput.setAttribute('style', 'border:');
                            }
                            else {
                                break;
                            }
                        }
                    }
                    console.log('triggeredCompliances', triggeredCompliances);
                    if (submitFlag) {
                        await this.uploadTriggerEvent(triggeredCompliances);
                        this.renderAdhoc();
                    }
                });
            }
            const submitButton = this._SfAdhocContainer.querySelector('#radio-submit');
            if (submitButton != null) {
                submitButton.addEventListener('click', async () => {
                    if (submitButtonConfirm != null && submitButtonConfirm.classList.contains('hide')) {
                        submitButtonConfirm.classList.remove('hide');
                    }
                    if (submitButtonCancel != null && submitButtonCancel.classList.contains('hide')) {
                        submitButtonCancel.classList.remove('hide');
                    }
                    if (submitButton != null && !submitButton.classList.contains('hide')) {
                        submitButton.classList.add('hide');
                    }
                    this.renderAdhocConfirmed(adhocQuestions, true);
                });
            }
        };
        this.renderRegister = async () => {
            var _a, _b;
            var html = '';
            html += '<div class="scroll-x w-100 mobile-only">';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">Search</label><br />';
            html += '<input id="stream-search-mobile" part="input" type="text" autofocus/>';
            html += '</div>';
            html += '</div>';
            html += '<div class="d-flex w-100">';
            html += '<div class="calendar-left-col desktop-only flex-col justify-start align-end">';
            html += '<div>';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">Search</label><br />';
            html += '<input id="stream-search" part="input" type="text" autofocus/>';
            html += '</div>';
            console.log('showRegisterExport', this.showRegisterExport);
            if (this.showRegisterExport && this.showRegisterExport == "true") {
                html += '<div class="title-item-date mt-20">';
                html += '<label part="input-label">Export</label><br /><br />';
                html += '<input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked name="radio-report" part="radio-download"/>';
                html += '<label for="radio-csv" part="label-radio-download" class="mr-10">Registers (CSV)</label><br />';
                html += '<button id="button-download" part="button" class="d-flex justify-center align-center w-100 mt-20"><span class="material-symbols-outlined">download</span>&nbsp;&nbsp;<span>Export</span></button>';
                html += '</div>';
            }
            html += '</div>';
            html += '</div>';
            html += '<div part="stream-event-list" class="calendar-right-data flex-grow pl-10 pt-20">';
            html += '</div>';
            html += '</div>';
            this._SfRegisterContainer.innerHTML = html;
            const events = await this.fetchRegisters();
            this.renderRegisterEvents(events);
            (_a = this._SfRegisterContainer.querySelector('#stream-search')) === null || _a === void 0 ? void 0 : _a.addEventListener('keyup', async (ev) => {
                //console.log('ev', ev.key);
                if (ev.key == "Enter") {
                    const searchString = this._SfRegisterContainer.querySelector('#stream-search').value;
                    const events = await this.fetchRegisters(searchString);
                    this.renderRegisterEvents(events);
                }
            });
            (_b = this._SfRegisterContainer.querySelector('#button-download')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                const ts = new Date();
                console.log(this.csvDataRegisters);
                const blob = new Blob([this.csvDataRegisters], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', 'report_' + ts + '.csv');
                a.click();
            });
        };
        this.renderFind = () => {
            //console.log('renderingFind');
            var _a;
            this.clearGraphData();
            this.clearSelectedGraphParam();
            this.clearSelectedLegend();
            var html = '';
            html += '<div class="scroll-x w-100 mobile-only">';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">Search</label><br />';
            html += '<input id="stream-search-mobile" part="input" type="text" autofocus/>';
            html += '</div>';
            html += '</div>';
            html += '<div class="d-flex w-100">';
            html += '<div class="calendar-left-col desktop-only flex-col justify-start align-end">';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">Search</label><br />';
            html += '<input id="stream-search" part="input" type="text" autofocus/>';
            html += '</div>';
            html += '</div>';
            html += '<div class="calendar-right-data flex-grow">';
            html += '</div>';
            html += '</div>';
            this._SfFindContainer.innerHTML = html;
            this.initFindRightCol();
            (_a = this._SfFindContainer.querySelector('#stream-search')) === null || _a === void 0 ? void 0 : _a.addEventListener('keyup', (ev) => {
                //console.log('key', ev.key);
                if (ev.key == "Enter") {
                    const searchString = this._SfFindContainer.querySelector('#stream-search').value;
                    this.processFindSelection(this._SfFindContainer, searchString);
                }
            });
        };
        this.renderCustom = () => {
            var _a, _b, _c, _f, _g, _h;
            this.clearGraphData();
            this.clearSelectedGraphParam();
            this.clearSelectedLegend();
            var html = '';
            html += '<div class="scroll-x w-100 mobile-only">';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">Start Date</label><br />';
            html += '<input id="stream-start-date-mobile" part="input" type="date" />';
            html += '</div>';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">End Date</label><br />';
            html += '<input id="stream-end-date-mobile" part="input" type="date" />';
            html += '</div>';
            html += '<div class="title-item-date">';
            html += '<button part="button-lg-short-secondary">This Quarter</button>';
            html += '</div>';
            html += '<div class="title-item-date">';
            html += '<button part="button-lg-short-secondary">This Year</button>';
            html += '</div>';
            html += '</div>';
            html += '<div class="d-flex w-100">';
            html += '<div class="calendar-left-col desktop-only flex-col justify-start align-end">';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">Start Date</label><br />';
            html += '<input id="stream-start-date" part="input" type="date" />';
            html += '</div>';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">End Date</label><br />';
            html += '<input id="stream-end-date" part="input" type="date" />';
            html += '</div>';
            html += '<div class="title-item-date">';
            html += '<button id="button-this-quarter" part="button-lg-short-secondary">This Quarter</button>';
            html += '</div>';
            html += '<div class="title-item-date">';
            html += '<button id="button-this-year" part="button-lg-short-secondary">This Year</button>';
            html += '</div>';
            html += '</div>';
            html += '<div class="calendar-right-data flex-grow">';
            html += '</div>';
            html += '</div>';
            this._SfCustomContainer.innerHTML = html;
            this.initCustomRightCol();
            (_a = this._SfCustomContainer.querySelector('#stream-start-date')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (_ev) => {
                //console.log('start-date', ev);
                this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                this.processDateSelection(this._SfCustomContainer);
            });
            (_b = this._SfCustomContainer.querySelector('#stream-end-date')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (_ev) => {
                //console.log('end-date', ev);
                this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                this.processDateSelection(this._SfCustomContainer);
            });
            (_c = this._SfCustomContainer.querySelector('#stream-start-date-mobile')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', (_ev) => {
                //console.log('start-date', ev);
                this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                this.processDateSelection(this._SfCustomContainer);
            });
            (_f = this._SfCustomContainer.querySelector('#stream-end-date-mobile')) === null || _f === void 0 ? void 0 : _f.addEventListener('change', (_ev) => {
                //console.log('end-date', ev);
                this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                this.processDateSelection(this._SfCustomContainer);
            });
            (_g = this._SfCustomContainer.querySelector('#button-this-year')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
                this._SfCustomContainer.querySelector('#stream-start-date').value = this.calendarStartYYYY + '-' + this.calendarStartMM + '-' + this.calendarStartDD;
                this._SfCustomContainer.querySelector('#stream-end-date').value = (parseInt(this.calendarStartYYYY) + 1) + '-' + this.calendarStartMM + '-' + this.calendarStartDD;
                this.processDateSelection(this._SfCustomContainer);
            });
            (_h = this._SfCustomContainer.querySelector('#button-this-quarter')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', () => {
                const mmCurrent = ((new Date().getMonth() + 1));
                let startDate = "";
                let endDate = "";
                if (mmCurrent >= 4 && mmCurrent <= 6) {
                    startDate = this.calendarStartYYYY + '-' + '04' + '-' + "01";
                    endDate = this.calendarStartYYYY + '-' + '07' + '-' + "01";
                }
                else if (mmCurrent >= 6 && mmCurrent <= 9) {
                    startDate = this.calendarStartYYYY + '-' + '07' + '-' + "01";
                    endDate = this.calendarStartYYYY + '-' + '10' + '-' + "01";
                }
                else if (mmCurrent >= 9 && mmCurrent <= 12) {
                    startDate = this.calendarStartYYYY + '-' + '10' + '-' + "01";
                    endDate = (parseInt(this.calendarStartYYYY) + 1) + '-' + '01' + '-' + "01";
                }
                else {
                    startDate = this.calendarStartYYYY + '-' + '01' + '-' + "01";
                    endDate = (parseInt(this.calendarStartYYYY) + 1) + '-' + '04' + '-' + "01";
                }
                this._SfCustomContainer.querySelector('#stream-start-date').value = startDate;
                this._SfCustomContainer.querySelector('#stream-end-date').value = endDate;
                this.processDateSelection(this._SfCustomContainer);
            });
            // for(var i = 0; i < 3; i++) {
            //   (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {
            //     const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
            //     //console.log('clicked ', target);
            //     this.renderPast(target);
            //   })
            // }
        };
        this.renderThis = (index = 1, showGraph = true) => {
            var _a, _b;
            this.clearGraphData();
            this.clearSelectedGraphParam();
            this.clearSelectedLegend();
            this.streamIndex = index;
            var html = '';
            html += '<div class="scroll-x w-100 mobile-only">';
            var part = "";
            if (index === 0) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-0-mobile" part="month-title" class="title-item ' + part + ' mr-10">Current Week</div>';
            part = "";
            if (index === 1) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-1-mobile" part="month-title" class="title-item ' + part + '">Current Month</div>';
            html += '</div>';
            html += '<div class="d-flex w-100">';
            html += '<div class="calendar-left-col desktop-only flex-col">';
            var part = "";
            if (index === 0) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-0" part="month-title" class="title-item ' + part + '">Week</div>';
            part = "";
            if (index === 1) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-1" part="month-title" class="title-item ' + part + '">Month</div>';
            html += '</div>';
            html += '<div class="calendar-right-data flex-grow">';
            // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var startDate = new Date();
            html += this.renderThisEvents(index, startDate, showGraph);
            startDate.setDate(startDate.getDate() + 1);
            html += '</div>';
            html += '</div>';
            this._SfThisContainer.innerHTML = html;
            const radioExpander = this._SfThisContainer.querySelector('#graph-radios-expander');
            radioExpander === null || radioExpander === void 0 ? void 0 : radioExpander.addEventListener('click', (e) => {
                const button = e.currentTarget;
                button.style.display = 'none';
                const arrRadios = this._SfThisContainer.querySelectorAll('.chart-radio-item-secondary');
                arrRadios.forEach(div => {
                    div.style.display = 'block';
                });
            });
            const radioCompleteness = this._SfThisContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
                this.renderThis(index);
                this.renderCompletenessGraph(this._SfThisContainer);
            });
            const radioTimeliness = this._SfThisContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
                this.renderThis(index);
                this.renderTimelinessGraph(this._SfThisContainer);
            });
            const radioRisk = this._SfThisContainer.querySelector('#radio-risk');
            radioRisk === null || radioRisk === void 0 ? void 0 : radioRisk.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
                this.renderThis(index);
                this.renderRiskGraph(this._SfThisContainer);
            });
            const radioFunction = this._SfThisContainer.querySelector('#radio-function');
            radioFunction === null || radioFunction === void 0 ? void 0 : radioFunction.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_FUNCTION;
                this.renderThis(index);
                this.renderFunctionGraph(this._SfThisContainer);
            });
            const radioRiskSeverity = this._SfThisContainer.querySelector('#radio-riskseverity');
            radioRiskSeverity === null || radioRiskSeverity === void 0 ? void 0 : radioRiskSeverity.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
                this.renderThis(index);
                this.renderRiskSeverityGraph(this._SfThisContainer);
            });
            const radioObligationType = this._SfThisContainer.querySelector('#radio-obligationtype');
            radioObligationType === null || radioObligationType === void 0 ? void 0 : radioObligationType.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
                this.renderThis(index);
                this.renderObligationTypeGraph(this._SfThisContainer);
            });
            const radioJurisdiction = this._SfThisContainer.querySelector('#radio-jurisdiction');
            radioJurisdiction === null || radioJurisdiction === void 0 ? void 0 : radioJurisdiction.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
                this.renderThis(index);
                this.renderJurisdictionGraph(this._SfThisContainer);
            });
            const radioFrequency = this._SfThisContainer.querySelector('#radio-frequency');
            radioFrequency === null || radioFrequency === void 0 ? void 0 : radioFrequency.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
                this.renderThis(index);
                this.renderFrequencyGraph(this._SfThisContainer);
            });
            const radioSubcategory = this._SfThisContainer.querySelector('#radio-subcategory');
            radioSubcategory === null || radioSubcategory === void 0 ? void 0 : radioSubcategory.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_SUBCATEGORY;
                this.renderThis(index);
                this.renderSubcategoryGraph(this._SfThisContainer);
            });
            const radioLocation = this._SfThisContainer.querySelector('#radio-location');
            radioLocation === null || radioLocation === void 0 ? void 0 : radioLocation.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_LOCATION;
                this.renderThis(index);
                this.renderLocationGraph(this._SfThisContainer);
            });
            // const buttonStatusMore = (this._SfThisContainer as HTMLDivElement).querySelector('#button-status-more');
            // buttonStatusMore?.addEventListener('click', () => {
            //   const divStatusList = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
            //   for(var i = 0; i < divStatusList.length; i++) {
            //     divStatusList[i].style.display = 'flex';
            //   }
            //   (buttonStatusMore as HTMLButtonElement).style.display = 'none';
            // });
            for (var i = 0; i < 3; i++) {
                (_a = this._SfThisContainer.querySelector('#stream-month-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    //console.log('clicked ', target);
                    const dateResult = this.calculateStartAndEndDateOfThis(target);
                    this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                    this.currentColumnIndex = target + "";
                    await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
                    this.renderThis(target);
                });
                (_b = this._SfThisContainer.querySelector('#stream-month-' + i + '-mobile')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    //console.log('clicked ', target);
                    this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                    this.currentColumnIndex = target + "";
                    const dateResult = this.calculateStartAndEndDateOfThis(target);
                    await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
                    this.renderThis(target);
                });
            }
            const buttonArr = this._SfThisContainer.querySelectorAll('.button-expand');
            for (i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    let found = false;
                    for (var k = 0; k < this.selectedItems.length; k++) {
                        if (this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
                            found = true;
                        }
                    }
                    if (!found) {
                        this.selectedItems = [];
                        this.clearButtonSelection();
                    }
                    this._SfDetailContainer.style.display = 'block';
                    var yyyy = this.getCurrentYear(idArr[3]);
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + yyyy, this._SfThisContainer.querySelector('#stream-month-' + this.currentColumnIndex));
                });
            }
            const streamEventsContainer = this._SfThisContainer.querySelectorAll('.stream-events-container');
            const buttonSelect = this._SfThisContainer.querySelectorAll('.button-select');
            for (i = 0; i < buttonSelect.length; i++) {
                buttonSelect[i].addEventListener('click', (ev) => {
                    //console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    // const mmdd = idArr[2] + "/" + idArr[3];
                    // const j = idArr[4];
                    // const makercheckers = idArr[5];
                    const docs = idArr[6];
                    if (ev.target.checked) {
                        this.selectedItems.push(id);
                    }
                    else {
                        this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
                    }
                    if (this.selectedItems.length === 0) {
                        for (var k = 0; k < buttonSelect.length; k++) {
                            buttonSelect[k].style.display = 'block';
                            streamEventsContainer[k].style.display = 'block';
                        }
                    }
                    else {
                        if (this.selectedItems.length === 1) {
                            const id1 = id;
                            const idArr1 = id1.split("-");
                            const status = idArr1[13].replace(/_/g, '-');
                            this.selectedStatus = status;
                        }
                        for (var k = 0; k < buttonSelect.length; k++) {
                            const id1 = buttonSelect[k].id;
                            const idArr1 = id1.split("-");
                            const docs1 = idArr1[6];
                            const status = idArr1[13].replace(/_/g, '-');
                            if (docs == docs1 && status == this.selectedStatus) {
                            }
                            else {
                                buttonSelect[k].style.display = 'none';
                                streamEventsContainer[k].style.display = 'none';
                            }
                        }
                    }
                    // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'
                    // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            if (showGraph)
                this.renderComplianceGraph(this._SfThisContainer);
        };
        this.renderStream = (index = 0, showGraph = true) => {
            //console.log('flowgraph renderStream', this.flowGraph);
            var _a, _b;
            this.streamIndex = index;
            this.clearGraphData();
            this.clearSelectedGraphParam();
            this.clearSelectedLegend();
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var html = '';
            html += '<div class="scroll-x w-100 mobile-only">';
            for (var i = 0; i < 12; i++) {
                var part = "";
                if (i === index) {
                    part = "stream-month-selected";
                }
                else {
                    part = "stream-month-not-selected";
                }
                html += '<div part="' + part + '" id="stream-month-' + i + '-mobile" part="month-title" class="title-item ' + part + ' mr-10">' + this.monthNames[startDate.getMonth()] + '&nbsp;' + startDate.getFullYear() % 100 + '</div>';
                startDate.setMonth(startDate.getMonth() + 1);
            }
            html += '</div>';
            html += '<div class="d-flex w-100">';
            html += '<div class="calendar-left-col desktop-only flex-col">';
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            for (i = 0; i < 12; i++) {
                var part = "";
                if (i === index) {
                    part = "stream-month-selected";
                }
                else {
                    part = "stream-month-not-selected";
                }
                html += '<div part="' + part + '" id="stream-month-' + i + '" part="month-title" class="title-item ' + part + '">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
                startDate.setMonth(startDate.getMonth() + 1);
            }
            html += '</div>';
            html += '<div class="calendar-right-data">';
            startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            for (i = 0; i < 12; i++) {
                if (i === index) {
                    //console.log(i, index)
                    html += this.renderStreamEvents(i, startDate.getMonth(), startDate.getFullYear(), showGraph);
                }
                startDate.setMonth(startDate.getMonth() + 1);
            }
            html += '</div>';
            html += '</div>';
            this._SfStreamContainer.innerHTML = html;
            this.attachTimelineFilterHandlers(this._SfStreamContainer);
            const radioExpander = this._SfStreamContainer.querySelector('#graph-radios-expander');
            radioExpander === null || radioExpander === void 0 ? void 0 : radioExpander.addEventListener('click', (e) => {
                const button = e.currentTarget;
                button.style.display = 'none';
                const arrRadios = this._SfStreamContainer.querySelectorAll('.chart-radio-item-secondary');
                arrRadios.forEach(div => {
                    div.style.display = 'block';
                });
            });
            const radioCompleteness = this._SfStreamContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
                this.renderStream(index);
                this.renderCompletenessGraph(this._SfStreamContainer);
            });
            const radioTimeliness = this._SfStreamContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
                this.renderStream(index);
                this.renderTimelinessGraph(this._SfStreamContainer);
            });
            const radioCompliance = this._SfStreamContainer.querySelector('#radio-compliance');
            radioCompliance === null || radioCompliance === void 0 ? void 0 : radioCompliance.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                this.renderStream(index);
                this.renderComplianceGraph(this._SfStreamContainer);
            });
            const radioRisk = this._SfStreamContainer.querySelector('#radio-risk');
            radioRisk === null || radioRisk === void 0 ? void 0 : radioRisk.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
                this.renderStream(index);
                this.renderRiskGraph(this._SfStreamContainer);
            });
            const radioRiskSeverity = this._SfStreamContainer.querySelector('#radio-riskseverity');
            radioRiskSeverity === null || radioRiskSeverity === void 0 ? void 0 : radioRiskSeverity.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
                this.renderStream(index);
                this.renderRiskSeverityGraph(this._SfStreamContainer);
            });
            const radioFunction = this._SfStreamContainer.querySelector('#radio-function');
            radioFunction === null || radioFunction === void 0 ? void 0 : radioFunction.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_FUNCTION;
                this.renderStream(index);
                this.renderFunctionGraph(this._SfStreamContainer);
            });
            const radioObligationType = this._SfStreamContainer.querySelector('#radio-obligationtype');
            radioObligationType === null || radioObligationType === void 0 ? void 0 : radioObligationType.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
                this.renderStream(index);
                this.renderObligationTypeGraph(this._SfStreamContainer);
            });
            const radioJurisdiction = this._SfStreamContainer.querySelector('#radio-jurisdiction');
            radioJurisdiction === null || radioJurisdiction === void 0 ? void 0 : radioJurisdiction.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
                this.renderStream(index);
                this.renderJurisdictionGraph(this._SfStreamContainer);
            });
            const radioFrequency = this._SfStreamContainer.querySelector('#radio-frequency');
            radioFrequency === null || radioFrequency === void 0 ? void 0 : radioFrequency.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
                this.renderStream(index);
                this.renderFrequencyGraph(this._SfStreamContainer);
            });
            const radioSubcategory = this._SfStreamContainer.querySelector('#radio-subcategory');
            radioSubcategory === null || radioSubcategory === void 0 ? void 0 : radioSubcategory.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_SUBCATEGORY;
                this.renderStream(index);
                this.renderSubcategoryGraph(this._SfStreamContainer);
            });
            const radioLocation = this._SfStreamContainer.querySelector('#radio-location');
            radioLocation === null || radioLocation === void 0 ? void 0 : radioLocation.addEventListener('click', () => {
                this.flowGraph = this.FLOW_GRAPH_LOCATION;
                this.renderStream(index);
                this.renderLocationGraph(this._SfStreamContainer);
            });
            // const buttonStatusMore = (this._SfStreamContainer as HTMLDivElement).querySelector('#button-status-more');
            // buttonStatusMore?.addEventListener('click', () => {
            //   const divStatusList = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
            //   for(var i = 0; i < divStatusList.length; i++) {
            //     divStatusList[i].style.display = 'flex';
            //   }
            //   (buttonStatusMore as HTMLButtonElement).style.display = 'none';
            // });
            for (var i = 0; i < 12; i++) {
                (_a = this._SfStreamContainer.querySelector('#stream-month-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    const dateResult = this.calculateStartAndEndDateOfStream(target);
                    //console.log('dateresult', dateResult);
                    this.currentColumnIndex = target + "";
                    if (dateResult != null) {
                        await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
                    }
                    this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                    this.renderStream(target);
                });
                (_b = this._SfStreamContainer.querySelector('#stream-month-' + i + '-mobile')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    const dateResult = this.calculateStartAndEndDateOfStream(target);
                    if (dateResult != null) {
                        await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
                    }
                    this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                    this.currentColumnIndex = target + "";
                    this.renderStream(target);
                });
            }
            const buttonArr = this._SfStreamContainer.querySelectorAll('.button-expand');
            for (i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    let found = false;
                    for (var k = 0; k < this.selectedItems.length; k++) {
                        console.log('selectedItems', this.selectedItems[k], idArr[3] + '-' + idArr[4] + '-' + idArr[5], this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]));
                        if (this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
                            found = true;
                        }
                    }
                    if (!found) {
                        this.selectedItems = [];
                        this.clearButtonSelection();
                    }
                    this._SfDetailContainer.style.display = 'block';
                    //console.log('commentsinlist', (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement, this.events[mmdd][j].comments, mmdd, j);
                    var yyyy = this.getCurrentYear(idArr[3]);
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + yyyy, this._SfStreamContainer.querySelector('#stream-month-' + this.currentColumnIndex));
                });
            }
            const streamEventsContainer = this._SfStreamContainer.querySelectorAll('.stream-events-container');
            const buttonSelect = this._SfStreamContainer.querySelectorAll('.button-select');
            for (i = 0; i < buttonSelect.length; i++) {
                buttonSelect[i].addEventListener('click', (ev) => {
                    //console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    // const mmdd = idArr[2] + "/" + idArr[3];
                    // const j = idArr[4];
                    // const makercheckers = idArr[5];
                    const docs = idArr[6];
                    if (ev.target.checked) {
                        this.selectedItems.push(id);
                    }
                    else {
                        this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
                    }
                    if (this.selectedItems.length === 0) {
                        for (var k = 0; k < buttonSelect.length; k++) {
                            buttonSelect[k].style.display = 'block';
                            streamEventsContainer[k].style.display = 'block';
                        }
                    }
                    else {
                        if (this.selectedItems.length === 1) {
                            const id1 = id;
                            const idArr1 = id1.split("-");
                            const status = idArr1[13].replace(/_/g, '-');
                            this.selectedStatus = status;
                        }
                        for (var k = 0; k < buttonSelect.length; k++) {
                            const id1 = buttonSelect[k].id;
                            const idArr1 = id1.split("-");
                            const docs1 = idArr1[6];
                            const status = idArr1[13].replace(/_/g, '-');
                            if (docs == docs1 && status == this.selectedStatus) {
                            }
                            else {
                                buttonSelect[k].style.display = 'none';
                                streamEventsContainer[k].style.display = 'none';
                            }
                        }
                    }
                    // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'
                    // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            if (showGraph)
                this.renderComplianceGraph(this._SfStreamContainer);
        };
        this.attachTimelineFilterHandlers = (divContainer) => {
            const divs = divContainer.querySelectorAll('.chip');
            divs.forEach(div => {
                div.addEventListener('click', () => {
                    const spans = div.querySelectorAll('span');
                    if (spans[2].innerHTML == "0") {
                        this.setError('No items present for the selected filter!');
                        setTimeout(() => {
                            this.clearMessages();
                        }, 2000);
                    }
                    else {
                        this.clickOnPie(false, parseInt(div.id.split('-')[2]));
                        this.chart.update();
                    }
                });
            });
        };
        this.getCurrentYear = (mm) => {
            // var currMonth = new Date().getMonth() + 1;
            // // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
            // //   yyyy = new Date().getFullYear() + "";
            // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
            // //   yyyy = (new Date().getFullYear() - 1) + "";
            // // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            // //   yyyy = (new Date().getFullYear() + 1) + "";
            // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            // //   yyyy = (new Date().getFullYear() + 1) + "";
            // // }
            // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
            //   yyyy = parseInt(this.calendarStartYYYY) + "";
            // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
            //   yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
            // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
            // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
            //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
            // }
            var yyyy = this.getYearFromMonthAndCalendarStart(mm);
            return yyyy;
        };
        this.clearButtonSelection = () => {
            const buttonSelect = this._SfStreamContainer.querySelectorAll('.button-select');
            for (var i = 0; i < buttonSelect.length; i++) {
                buttonSelect[i].checked = false;
            }
        };
        this.clearGraphData = () => {
            //console.log('clearing graph data');
            this.chart = null;
            this.chart2 = null;
            this.chart3 = null;
            this.chart4 = null;
            this.riskAreasData = null;
            this.riskAreasPartStatusData = null;
            this.riskAreasLateStatusData = null;
            this.riskAreasComplianceStatusData = null;
            this.riskSeverityData = null;
            this.riskSeverityLateStatusData = null;
            this.riskSeverityPartStatusData = null;
            this.riskSeverityComplianceStatusData = null;
            this.functionData = null;
            this.functionLateStatusData = null;
            this.functionPartStatusData = null;
            this.functionComplianceStatusData = null;
            this.locationData = null;
            this.locationLateStatusData = null;
            this.locationPartStatusData = null;
            this.locationComplianceStatusData = null;
            this.obligationTypeData = null;
            this.obligationTypeLateStatusData = null;
            this.obligationTypePartStatusData = null;
            this.obligationTypeComplianceStatusData = null;
            this.jurisdictionData = null;
            this.jurisdictionPartStatusData = null;
            this.jurisdictionLateStatusData = null;
            this.jurisdictionComplianceStatusData = null;
            this.subcategoryData = null;
            this.subcategoryLateStatusData = null;
            this.subcategoryPartStatusData = null;
            this.subcategoryComplianceStatusData = null;
            this.frequencyData = null;
            this.frequencyLateStatusData = null;
            this.frequencyPartStatusData = null;
            this.frequencyComplianceStatusData = null;
        };
        this.showGraph = (divContainer, index) => {
            if (index == 1) {
                divContainer.querySelector('#myChart').parentElement.style.display = 'block';
            }
            if (index == 4) {
                divContainer.querySelector('#myChart4').parentElement.style.display = 'block';
            }
            if (index == 2) {
                divContainer.querySelector('#myChart2').parentElement.style.display = 'block';
                // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.add('gone');
                // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).parentElement!.style.height = '0px';
                // if(this.chart2 != null) {
                //   (this.chart2 as Chart).destroy();
                // }
                // this.chart2 = null;
            }
            if (index == 3) {
                divContainer.querySelector('#myChart3').parentElement.style.display = 'block';
                // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.add('gone');
                // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).parentElement!.style.height = '0px';
                // if(this.chart3 != null) {
                //   (this.chart3 as Chart).destroy();
                // }
                // this.chart3 = null;
            }
        };
        this.clearGraph = (divContainer, index) => {
            if (index == 1) {
                divContainer.querySelector('#myChart').parentElement.style.display = 'none';
            }
            if (index == 4) {
                divContainer.querySelector('#myChart4').parentElement.style.display = 'none';
            }
            if (index == 2) {
                divContainer.querySelector('#myChart2').parentElement.style.display = 'none';
                // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.add('gone');
                // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).parentElement!.style.height = '0px';
                // if(this.chart2 != null) {
                //   (this.chart2 as Chart).destroy();
                // }
                // this.chart2 = null;
            }
            if (index == 3) {
                divContainer.querySelector('#myChart3').parentElement.style.display = 'none';
                // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.add('gone');
                // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).parentElement!.style.height = '0px';
                // if(this.chart3 != null) {
                //   (this.chart3 as Chart).destroy();
                // }
                // this.chart3 = null;
            }
        };
        this.renderCompletenessCsvForGraph = (dataBar, parameter) => {
            this.csvCompletenessStats = parameter + ",Not Started,In Progress,Complete\n";
            for (var i = 0; i < dataBar['labels'].length; i++) {
                this.csvCompletenessStats += dataBar['labels'][i].join(" ") + "," + dataBar['datasets'][2]['data'][i] + "," + dataBar['datasets'][1]['data'][i] + "," + dataBar['datasets'][0]['data'][i] + (i < (dataBar['labels'].length - 1) ? "\n" : "");
            }
            //console.log('rendering csv completeness', this.csvCompletenessStats);
        };
        this.renderTimelinessCsvForGraph = (dataBar, parameter) => {
            //console.log('dataBar', dataBar);
            this.csvTimelinessStats = parameter + ",In Time,Past Due Date,Late Approved,Late Executed,Late Reported\n";
            for (var i = 0; i < dataBar['labels'].length; i++) {
                this.csvTimelinessStats += dataBar['labels'][i].join(" ") + "," + dataBar['datasets'][0]['data'][i] + "," + dataBar['datasets'][1]['data'][i] + "," + dataBar['datasets'][3]['data'][i] + "," + dataBar['datasets'][2]['data'][i] + "," + dataBar['datasets'][4]['data'][i] + (i < (dataBar['labels'].length - 1) ? "\n" : "");
            }
            //console.log('rendering csv csvTimelinessStats', this.csvTimelinessStats);
        };
        this.renderComplianceCsvForGraph = (dataBar, parameter) => {
            this.csvComplianceStats = parameter + ",Scheduled,Not Complied,Partially Complied,Complied\n";
            for (var i = 0; i < dataBar['labels'].length; i++) {
                this.csvComplianceStats += dataBar['labels'][i].join(" ") + "," + dataBar['datasets'][0]['data'][i] + "," + dataBar['datasets'][1]['data'][i] + "," + dataBar['datasets'][3]['data'][i] + "," + dataBar['datasets'][2]['data'][i] + (i < (dataBar['labels'].length - 1) ? "\n" : "");
            }
            //console.log('rendering csv csvComplianceStats', this.csvComplianceStats);
        };
        this.renderCompletenessGraph = (divContainer) => {
            this.clearSelectedGraphParam();
            // this.clearSelectedLegend();
            this.csvGraphStats = "";
            this.csvCompletenessStats = "";
            this.csvTimelinessStats = "";
            this.csvComplianceStats = "";
            if (divContainer.querySelector('#graph-approved') == null)
                return;
            var dataApproved = divContainer.querySelector('#graph-approved').innerHTML;
            var dataNotStarted = divContainer.querySelector('#graph-not-started').innerHTML;
            var dataPendingApproval = divContainer.querySelector('#graph-pending-approval').innerHTML;
            var dataRejected = divContainer.querySelector('#graph-rejected').innerHTML;
            const ctx = divContainer.querySelector('#myChart');
            this.showGraph(divContainer, 1);
            this.clearGraph(divContainer, 2);
            this.clearGraph(divContainer, 3);
            this.clearGraph(divContainer, 4);
            if (this.fill == "pattern") {
                const data = {
                    labels: ['Approved', 'Not Started', 'Pending Approval', 'Rejected'],
                    datasets: [{
                            label: 'Compliances',
                            data: [dataApproved, dataNotStarted, dataPendingApproval, dataRejected],
                            borderWidth: 1,
                            backgroundColor: [
                                Util.createDiagonalPattern3(this.COLOR_APPROVED),
                                Util.createDiagonalPattern2(this.COLOR_NOT_STARTED),
                                Util.createDiagonalPattern1(this.COLOR_PENDING_APPROVAL),
                                Util.createDiagonalPattern1(this.COLOR_REJECTED)
                            ]
                        }]
                };
                this.renderChartSettings(divContainer, -1, ctx);
                this.renderChart(ctx, 'doughnut', data, "Completeness");
            }
            const data = {
                labels: ['Approved', 'Not Started', 'Pending Approval', 'Rejected'],
                datasets: [{
                        label: 'Compliances',
                        data: [dataApproved, dataNotStarted, dataPendingApproval, dataRejected],
                        borderWidth: 1,
                        backgroundColor: [
                            this.COLOR_APPROVED,
                            this.COLOR_NOT_STARTED,
                            this.COLOR_PENDING_APPROVAL,
                            this.COLOR_REJECTED
                        ]
                    }]
            };
            this.csvGraphStats += 'Completeness,Approved,Not Started,Pending Approval,Rejected,Total\n';
            this.csvGraphStats += 'Total,' + dataApproved + ',' + dataNotStarted + ',' + dataPendingApproval + ',' + dataRejected + ',' + (parseInt(dataApproved) + parseInt(dataNotStarted) + parseInt(dataPendingApproval) + parseInt(dataRejected)) + '\n';
            const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness');
            for (var i = 0; i < itemsTimeliness.length; i++) {
                itemsTimeliness[i].style.display = 'none';
            }
            const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness');
            for (var i = 0; i < itemsCompleteness.length; i++) {
                itemsCompleteness[i].style.display = 'flex';
            }
            const itemsCompliance = divContainer.querySelectorAll('.stat-compliance');
            for (var i = 0; i < itemsCompliance.length; i++) {
                itemsCompliance[i].style.display = 'none';
            }
            this.renderChartSettings(divContainer, -1, ctx);
            this.renderChart(ctx, 'doughnut', data, "Completeness");
        };
        this.renderComplianceGraph = (divContainer) => {
            //console.log('Rendering compliance graph...');
            this.clearSelectedGraphParam();
            // this.clearSelectedLegend();
            this.csvGraphStats = "";
            this.csvCompletenessStats = "";
            this.csvTimelinessStats = "";
            this.csvComplianceStats = "";
            var dataTotal = divContainer.querySelector('#graph-total').innerHTML;
            var dataNotComplied = divContainer.querySelector('#graph-not-complied').innerHTML;
            var dataScheduled = divContainer.querySelector('#graph-scheduled').innerHTML;
            var dataPartiallyComplied = divContainer.querySelector('#graph-partially-complied').innerHTML;
            var dataComplied = divContainer.querySelector('#graph-complied').innerHTML;
            const ctx = divContainer.querySelector('#myChart');
            this.showGraph(divContainer, 1);
            this.clearGraph(divContainer, 2);
            this.clearGraph(divContainer, 3);
            this.clearGraph(divContainer, 4);
            const data = {
                labels: ['Scheduled', 'Not Complied', 'Partially Complied', 'Complied'],
                datasets: [{
                        label: 'Compliances',
                        data: [dataScheduled, dataNotComplied, dataPartiallyComplied, dataComplied],
                        borderWidth: 1,
                        backgroundColor: [
                            this.COLOR_SCHEDULED,
                            this.COLOR_NOT_COMPLIED,
                            this.COLOR_PARTIALLY_COMPLIED,
                            this.COLOR_COMPLIED
                        ]
                    }]
            };
            this.csvGraphStats += 'Compliance,Scheduled,Not Complied,Partially Complied,Complied,Total\n';
            this.csvGraphStats += 'Count,' + parseInt(dataScheduled) + ',' + parseInt(dataNotComplied) + ',' + parseInt(dataPartiallyComplied) + ',' + parseInt(dataComplied) + ',' + parseInt(dataTotal) + '\n';
            //console.log('rendering timeliness graph', this.csvGraphStats);
            const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness');
            for (var i = 0; i < itemsTimeliness.length; i++) {
                itemsTimeliness[i].style.display = 'none';
            }
            const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness');
            for (var i = 0; i < itemsCompleteness.length; i++) {
                itemsCompleteness[i].style.display = 'none';
            }
            const itemsCompliance = divContainer.querySelectorAll('.stat-compliance');
            for (var i = 0; i < itemsCompliance.length; i++) {
                itemsCompliance[i].style.display = 'flex';
            }
            this.renderChartSettings(divContainer, -1, ctx);
            this.renderChart(ctx, 'doughnut', data, "Compliance");
        };
        this.renderTimelinessGraph = (divContainer) => {
            this.clearSelectedGraphParam();
            // this.clearSelectedLegend();
            this.csvGraphStats = "";
            this.csvCompletenessStats = "";
            this.csvTimelinessStats = "";
            this.csvComplianceStats = "";
            var dataTotal = divContainer.querySelector('#graph-total').innerHTML;
            var dataPastDueDate = divContainer.querySelector('#graph-past-due-date').innerHTML;
            var dataLateApproved = divContainer.querySelector('#graph-late-approved').innerHTML;
            var dataLateExecuted = divContainer.querySelector('#graph-late-executed').innerHTML;
            var dataLateReported = divContainer.querySelector('#graph-late-reported').innerHTML;
            const ctx = divContainer.querySelector('#myChart');
            this.showGraph(divContainer, 1);
            this.clearGraph(divContainer, 2);
            this.clearGraph(divContainer, 3);
            this.clearGraph(divContainer, 4);
            const data = {
                labels: ['In Time', 'Past Due Date', 'Late Approved', 'Late Executed', 'Late Reported'],
                datasets: [{
                        label: 'Compliances',
                        data: [(parseInt(dataTotal) - (parseInt(dataPastDueDate) + parseInt(dataLateApproved) + parseInt(dataLateExecuted) + parseInt(dataLateReported))) + "", dataPastDueDate, dataLateApproved, dataLateExecuted, dataLateReported],
                        borderWidth: 1,
                        backgroundColor: [
                            this.COLOR_NOT_STARTED,
                            this.COLOR_PAST_DUE_DATE,
                            this.COLOR_LATE_APPROVED,
                            this.COLOR_LATE_EXECUTED,
                            this.COLOR_LATE_REPORTED
                        ]
                    }]
            };
            this.csvGraphStats += 'Completeness,In Time,Past Due Date,Late Approved,Late Executed,Late Reported,Total\n';
            this.csvGraphStats += 'Count,' + (parseInt(dataTotal) - (parseInt(dataPastDueDate) + parseInt(dataLateApproved) + parseInt(dataLateExecuted))) + ',' + (parseInt(dataPastDueDate) + ',' + parseInt(dataLateApproved) + ',' + parseInt(dataLateExecuted) + ',' + parseInt(dataLateReported) + ',' + (parseInt(dataTotal) - (parseInt(dataPastDueDate) + parseInt(dataLateApproved) + parseInt(dataLateExecuted) + parseInt(dataLateReported)))) + '\n';
            //console.log('rendering timeliness graph', this.csvGraphStats);
            const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness');
            for (var i = 0; i < itemsTimeliness.length; i++) {
                itemsTimeliness[i].style.display = 'flex';
            }
            const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness');
            for (var i = 0; i < itemsCompleteness.length; i++) {
                itemsCompleteness[i].style.display = 'none';
            }
            const itemsCompliance = divContainer.querySelectorAll('.stat-compliance');
            for (var i = 0; i < itemsCompliance.length; i++) {
                itemsCompliance[i].style.display = 'none';
            }
            this.renderChartSettings(divContainer, -1, ctx);
            this.renderChart(ctx, 'doughnut', data, "Timeliness");
        };
        this.renderRiskSeverityGraph = (divContainer) => {
            //console.log('Rendering risk severity', this.riskSeverityComplianceStatusData);
            this.renderGraph(divContainer, this.riskSeverityData, this.riskSeverityPartStatusData, this.riskSeverityLateStatusData, this.riskSeverityComplianceStatusData, 'RiskSeverity');
        };
        this.renderObligationTypeGraph = (divContainer) => {
            this.renderGraph(divContainer, this.obligationTypeData, this.obligationTypePartStatusData, this.obligationTypeLateStatusData, this.obligationTypeComplianceStatusData, 'ObligationType');
        };
        this.renderFunctionGraph = (divContainer) => {
            this.renderGraph(divContainer, this.functionData, this.functionPartStatusData, this.functionLateStatusData, this.functionComplianceStatusData, 'Function');
        };
        this.renderLocationGraph = (divContainer) => {
            this.renderGraph(divContainer, this.locationData, this.locationPartStatusData, this.locationLateStatusData, this.locationComplianceStatusData, 'Location');
        };
        this.renderJurisdictionGraph = (divContainer) => {
            this.renderGraph(divContainer, this.jurisdictionData, this.jurisdictionPartStatusData, this.jurisdictionLateStatusData, this.jurisdictionComplianceStatusData, 'Jurisdiction');
        };
        this.renderSubcategoryGraph = (divContainer) => {
            this.renderGraph(divContainer, this.subcategoryData, this.subcategoryPartStatusData, this.subcategoryLateStatusData, this.subcategoryComplianceStatusData, 'SubCategory');
        };
        this.renderFrequencyGraph = (divContainer) => {
            this.renderGraph(divContainer, this.frequencyData, this.frequencyPartStatusData, this.frequencyLateStatusData, this.frequencyComplianceStatusData, 'Frequency');
        };
        this.renderRiskGraph = (divContainer) => {
            this.renderGraph(divContainer, this.riskAreasData, this.riskAreasPartStatusData, this.riskAreasLateStatusData, this.riskAreasComplianceStatusData, 'RiskAreas');
        };
        this.populateGraphDataBarPart = (partData) => {
            const dataBar = {};
            dataBar['labels'] = [];
            for (var i = 0; i < Object.keys(partData).length; i++) {
                dataBar['labels'].push(this.formatLabel(Object.keys(partData)[i], 15));
            }
            dataBar['datasets'] = [];
            dataBar['datasets'].push({});
            dataBar['datasets'].push({});
            dataBar['datasets'].push({});
            dataBar['datasets'].push({});
            dataBar['datasets'][0]['label'] = 'Approved';
            dataBar['datasets'][0]['data'] = [];
            for (i = 0; i < Object.keys(partData).length; i++) {
                dataBar['datasets'][0]['data'].push(partData[Object.keys(partData)[i]]['approved']);
            }
            dataBar['datasets'][0]['backgroundColor'] = this.COLOR_APPROVED;
            dataBar['datasets'][1]['label'] = 'Pending Approval';
            dataBar['datasets'][1]['data'] = [];
            for (i = 0; i < Object.keys(partData).length; i++) {
                dataBar['datasets'][1]['data'].push(partData[Object.keys(partData)[i]]['pending-approval']);
            }
            dataBar['datasets'][1]['backgroundColor'] = this.COLOR_PENDING_APPROVAL;
            dataBar['datasets'][2]['label'] = 'Rejected';
            dataBar['datasets'][2]['data'] = [];
            for (i = 0; i < Object.keys(partData).length; i++) {
                dataBar['datasets'][2]['data'].push(partData[Object.keys(partData)[i]]['rejected']);
            }
            dataBar['datasets'][2]['backgroundColor'] = this.COLOR_REJECTED;
            dataBar['datasets'][3]['label'] = 'Not Started';
            dataBar['datasets'][3]['data'] = [];
            for (i = 0; i < Object.keys(partData).length; i++) {
                dataBar['datasets'][3]['data'].push(partData[Object.keys(partData)[i]]['not-started']);
            }
            dataBar['datasets'][3]['backgroundColor'] = this.COLOR_NOT_STARTED;
            return dataBar;
        };
        this.populateGraphDataBarLate = (lateData) => {
            const dataBar2 = {};
            dataBar2['labels'] = [];
            for (var i = 0; i < Object.keys(lateData).length; i++) {
                dataBar2['labels'].push(this.formatLabel(Object.keys(lateData)[i], 15));
            }
            dataBar2['datasets'] = [];
            dataBar2['datasets'].push({});
            dataBar2['datasets'].push({});
            dataBar2['datasets'].push({});
            dataBar2['datasets'].push({});
            dataBar2['datasets'].push({});
            dataBar2['datasets'][0]['label'] = 'In Time';
            dataBar2['datasets'][0]['data'] = [];
            for (i = 0; i < Object.keys(lateData).length; i++) {
                dataBar2['datasets'][0]['data'].push(lateData[Object.keys(lateData)[i]]['in-time']);
            }
            dataBar2['datasets'][0]['backgroundColor'] = '#888888';
            dataBar2['datasets'][1]['label'] = 'Past Due Date';
            dataBar2['datasets'][1]['data'] = [];
            for (i = 0; i < Object.keys(lateData).length; i++) {
                dataBar2['datasets'][1]['data'].push(lateData[Object.keys(lateData)[i]]['past-due-date']);
            }
            dataBar2['datasets'][1]['backgroundColor'] = this.COLOR_PAST_DUE_DATE;
            dataBar2['datasets'][2]['label'] = 'Late Executed';
            dataBar2['datasets'][2]['data'] = [];
            for (i = 0; i < Object.keys(lateData).length; i++) {
                dataBar2['datasets'][2]['data'].push(lateData[Object.keys(lateData)[i]]['late-executed']);
            }
            dataBar2['datasets'][2]['backgroundColor'] = this.COLOR_LATE_EXECUTED;
            dataBar2['datasets'][3]['label'] = 'Late Approved';
            dataBar2['datasets'][3]['data'] = [];
            for (i = 0; i < Object.keys(lateData).length; i++) {
                dataBar2['datasets'][3]['data'].push(lateData[Object.keys(lateData)[i]]['late-approved']);
            }
            dataBar2['datasets'][3]['backgroundColor'] = this.COLOR_LATE_APPROVED;
            dataBar2['datasets'][4]['label'] = 'Late Reported';
            dataBar2['datasets'][4]['data'] = [];
            for (i = 0; i < Object.keys(lateData).length; i++) {
                dataBar2['datasets'][4]['data'].push(lateData[Object.keys(lateData)[i]]['late-reported']);
            }
            dataBar2['datasets'][4]['backgroundColor'] = this.COLOR_LATE_REPORTED;
            return dataBar2;
        };
        this.populateGraphDataBarCompliance = (complianceData) => {
            const dataBar2 = {};
            dataBar2['labels'] = [];
            for (var i = 0; i < Object.keys(complianceData).length; i++) {
                dataBar2['labels'].push(this.formatLabel(Object.keys(complianceData)[i], 15));
            }
            dataBar2['datasets'] = [];
            dataBar2['datasets'].push({});
            dataBar2['datasets'].push({});
            dataBar2['datasets'].push({});
            dataBar2['datasets'].push({});
            dataBar2['datasets'][0]['label'] = 'Scheduled';
            dataBar2['datasets'][0]['data'] = [];
            for (i = 0; i < Object.keys(complianceData).length; i++) {
                dataBar2['datasets'][0]['data'].push(complianceData[Object.keys(complianceData)[i]]['scheduled']);
            }
            dataBar2['datasets'][0]['backgroundColor'] = this.COLOR_SCHEDULED;
            dataBar2['datasets'][1]['label'] = 'Not Complied';
            dataBar2['datasets'][1]['data'] = [];
            for (i = 0; i < Object.keys(complianceData).length; i++) {
                dataBar2['datasets'][1]['data'].push(complianceData[Object.keys(complianceData)[i]]['not-complied']);
            }
            dataBar2['datasets'][1]['backgroundColor'] = this.COLOR_NOT_COMPLIED;
            dataBar2['datasets'][2]['label'] = 'Partially Complied';
            dataBar2['datasets'][2]['data'] = [];
            for (i = 0; i < Object.keys(complianceData).length; i++) {
                dataBar2['datasets'][2]['data'].push(complianceData[Object.keys(complianceData)[i]]['partially-complied']);
            }
            dataBar2['datasets'][2]['backgroundColor'] = this.COLOR_PARTIALLY_COMPLIED;
            dataBar2['datasets'][3]['label'] = 'Complied';
            dataBar2['datasets'][3]['data'] = [];
            for (i = 0; i < Object.keys(complianceData).length; i++) {
                dataBar2['datasets'][3]['data'].push(complianceData[Object.keys(complianceData)[i]]['complied']);
            }
            dataBar2['datasets'][3]['backgroundColor'] = this.COLOR_COMPLIED;
            return dataBar2;
        };
        this.populateGraphDataPie = (pieData) => {
            const data = {};
            data['labels'] = [];
            data['datasets'] = [];
            data['datasets'].push({});
            data['datasets'][0]['data'] = [];
            data['datasets'][0]['backgroundColor'] = [];
            data['datasets'][0]['borderWidth'] = 1;
            for (var i = 0; i < Object.keys(pieData).length; i++) {
                data['labels'].push(Object.keys(pieData)[i]);
            }
            for (var i = 0; i < Object.keys(pieData).length; i++) {
                data['datasets'][0]['data'].push(pieData[Object.keys(pieData)[i]]);
                data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
            }
            return data;
        };
        this.renderPieCsv = (pieData, csv, param) => {
            csv += param + ',';
            for (var i = 0; i < Object.keys(pieData).length; i++) {
                csv += (Object.keys(pieData)[i]);
                if (i < (Object.keys(pieData).length - 1)) {
                    csv += ',';
                }
            }
            csv += '\n';
            csv += 'Count,';
            for (var i = 0; i < Object.keys(pieData).length; i++) {
                csv += (pieData[Object.keys(pieData)[i]]);
                if (i < (Object.keys(pieData).length - 1)) {
                    csv += ',';
                }
            }
            csv += '\n';
            return csv;
        };
        this.renderGraph = (divContainer, pieData, partData, lateData, complianceData, param) => {
            this.clearSelectedGraphParam();
            // this.clearSelectedLegend();
            this.csvGraphStats = "";
            this.csvCompletenessStats = "";
            this.csvTimelinessStats = "";
            this.csvComplianceStats = "";
            if (pieData == null)
                return;
            // this.clearGraph(divContainer, 4);
            const data = this.populateGraphDataPie(pieData);
            this.csvGraphStats = this.renderPieCsv(pieData, this.csvGraphStats, param);
            const ctx = divContainer.querySelector('#myChart');
            this.renderChartSettings(divContainer, -1, ctx);
            this.renderChart(ctx, 'pie', data, param + " Distribution");
            // 2
            const dataBar = this.populateGraphDataBarPart(partData);
            const ctx2 = divContainer.querySelector('#myChart2');
            this.showGraph(divContainer, 2);
            this.renderChart2(ctx2, 'bar', dataBar, param + " vs Completeness");
            this.renderCompletenessCsvForGraph(dataBar, param + " Completeness Breakdown");
            // 3
            const dataBar2 = this.populateGraphDataBarLate(lateData);
            const ctx3 = divContainer.querySelector('#myChart3');
            this.showGraph(divContainer, 3);
            this.renderChart3(ctx3, 'bar', dataBar2, param + " vs Timeliness");
            this.renderTimelinessCsvForGraph(dataBar2, param + " Timeliness Breakdown");
            // 4
            //console.log('rendering compliance matrix', complianceData);
            const dataBar3 = this.populateGraphDataBarCompliance(complianceData);
            //console.log('rendering compliance matrix', dataBar3);
            const ctx4 = divContainer.querySelector('#myChart4');
            this.showGraph(divContainer, 4);
            this.renderChart4(ctx4, 'bar', dataBar3, param + " vs Compliance");
            this.renderComplianceCsvForGraph(dataBar3, param + " Compliance Breakdown");
            const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness');
            for (var i = 0; i < itemsTimeliness.length; i++) {
                itemsTimeliness[i].style.display = 'flex';
            }
            const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness');
            for (var i = 0; i < itemsCompleteness.length; i++) {
                itemsCompleteness[i].style.display = 'flex';
            }
            const itemsCompliance = divContainer.querySelectorAll('.stat-compliance');
            for (var i = 0; i < itemsCompliance.length; i++) {
                itemsCompliance[i].style.display = 'flex';
            }
        };
        this.renderEventDetailShort = (compliance) => {
            var _a, _b, _c, _f, _g;
            var html = `
    
      <div class="d-flex justify-between m-20">
        <button part="button-icon" class="material-icons invisible">close</button>
        <h3 part="results-title" class="m-0">Compliance Details</h3>
        <button id="button-detail-close" part="button-icon" class="material-icons">close</button>
      </div>
    
    `;
            html += '<div class="accordian-container m-20 pb-20" part="accordian-container">';
            html += '<div class="accordian-section section-basic pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex flex-wrap accordian-body body-basic" part="accordian-body">';
            const data = JSON.parse(compliance.data);
            const cols = JSON.parse(compliance.cols);
            //console.log('cols', cols, cols.length);
            for (var k = 0; k < cols.length; k++) {
                if (!this.EXCLUDE_COLS_FROM_REGS.includes(cols[k].toLowerCase())) {
                    html += '<div class="m-20">';
                    html += '<div part="detail-head"><strong>' + cols[k] + '</strong></div>';
                    html += '<sf-i-elastic-text text="' + data[k] + '" minLength="80" lineSize="6"></sf-i-elastic-text>';
                    html += '</div>';
                }
            }
            html += '</div>';
            html += '<div class="d-flex justify-end flex-wrap">';
            html += '<div class="d-flex justify-end w-100 mb-10">';
            html += '<textarea part="input" id="feedback-message" class="w-100 mt-10 mb-10 hide" placeholder="Type your feedback message here..."></textarea>';
            html += '</div>';
            html += '<div class="d-flex justify-end w-100">';
            html += ('<button part="button-lg-short" id="button-feedback" class="d-flex justify-center align-center"><span class="material-symbols-outlined">comment</span><span>&nbsp;&nbsp;Send Feedback</span></button>');
            html += ('<button part="button-lg-short-secondary" id="button-feedback-cancel" class="hide d-flex justify-center align-center mr-10"><span class="material-symbols-outlined">close</span><span>&nbsp;&nbsp;Cancel</span></button>');
            html += ('<button part="button-lg-short" id="button-feedback-confirm" class="hide d-flex justify-center align-center"><span class="material-symbols-outlined">commentcheck</span><span>&nbsp;&nbsp;Submit Feedback</span></button>');
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            this._SfDetailContainer.style.display = 'block';
            this._SfDetailContainer.innerHTML = html;
            (_a = this._SfDetailContainer.querySelector('#button-detail-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this._SfDetailContainer.innerHTML = '';
                this._SfDetailContainer.style.display = 'none';
            });
            (_b = this._SfDetailContainer.querySelector('#button-feedback')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                const feedbackMessage = this._SfDetailContainer.querySelector('#feedback-message');
                const buttonFeedback = this._SfDetailContainer.querySelector('#button-feedback');
                const buttonCancel = this._SfDetailContainer.querySelector('#button-feedback-cancel');
                const buttonConfirm = this._SfDetailContainer.querySelector('#button-feedback-confirm');
                console.log(buttonConfirm.classList);
                if (feedbackMessage.classList.contains('hide')) {
                    feedbackMessage.classList.remove('hide');
                }
                if (buttonConfirm.classList.contains('hide')) {
                    buttonConfirm.classList.remove('hide');
                }
                if (buttonCancel.classList.contains('hide')) {
                    buttonCancel.classList.remove('hide');
                }
                if (!buttonFeedback.classList.contains('hide')) {
                    buttonFeedback.classList.add('hide');
                }
                // const body = {
                //   projectid: this.projectId,
                //   complianceid: compliance.id
                // }
                // console.log(body);
            });
            (_c = this._SfDetailContainer.querySelector('#button-feedback-cancel')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                const feedbackMessage = this._SfDetailContainer.querySelector('#feedback-message');
                const buttonFeedback = this._SfDetailContainer.querySelector('#button-feedback');
                const buttonCancel = this._SfDetailContainer.querySelector('#button-feedback-cancel');
                const buttonConfirm = this._SfDetailContainer.querySelector('#button-feedback-confirm');
                console.log(buttonConfirm.classList);
                if (!feedbackMessage.classList.contains('hide')) {
                    feedbackMessage.classList.add('hide');
                }
                if (!buttonConfirm.classList.contains('hide')) {
                    buttonConfirm.classList.add('hide');
                }
                if (!buttonCancel.classList.contains('hide')) {
                    buttonCancel.classList.add('hide');
                }
                if (buttonFeedback.classList.contains('hide')) {
                    buttonFeedback.classList.remove('hide');
                }
            });
            (_f = this._SfDetailContainer.querySelector('#button-feedback-confirm')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                const feedbackMessage = this._SfDetailContainer.querySelector('#feedback-message');
                const buttonCancel = this._SfDetailContainer.querySelector('#button-feedback-cancel');
                const buttonClose = this._SfDetailContainer.querySelector('#button-detail-close');
                if (feedbackMessage.value.length === 0) {
                    feedbackMessage.setAttribute('style', 'border:solid 2px ' + this.COLOR_REJECTED + ' !important');
                }
                else {
                    feedbackMessage.setAttribute('style', 'border:');
                    const cols = JSON.parse(compliance.cols);
                    const data = JSON.parse(compliance.data);
                    console.log(compliance, cols, data);
                    this.uploadTriggerMyEvent(compliance.id, feedbackMessage.value, compliance.countries.join(",").replace(/ *\([^)]*\) */g, ""), compliance.entities.join(',').replace(/ *\([^)]*\) */g, ""), compliance.locations.join(',').replace(/ *\([^)]*\) */g, ""), data[cols.indexOf('statute')][0], data[cols.indexOf('subcategory')][0]);
                    buttonCancel.click();
                    buttonClose.click();
                }
            });
            (_g = this._SfDetailContainer.querySelector('#feedback-message')) === null || _g === void 0 ? void 0 : _g.addEventListener('keyup', (e) => {
                if (e.code == "Enter") {
                    const buttonConfirm = this._SfDetailContainer.querySelector('#button-feedback-confirm');
                    buttonConfirm.click();
                }
            });
        };
        this.renderEventDetail = (event, mmddyyyy, currentColumnButton) => {
            var _a, _b, _c, _f, _g, _h, _k, _l, _m;
            let comments, docs, approved, dateOfCompletion, makercheckers, docsOptional, documentType;
            let entityId = "";
            let locationId = "";
            entityId = event.entityid;
            locationId = event.locationid;
            comments = event['comments'] == null ? [] : (event['comments']);
            docs = event['documents'] == null ? [] : event['documents'] == null ? [] : (event['documents']);
            approved = event['approved'] == null ? false : event['approved'] == null ? false : event['approved'];
            dateOfCompletion = event['dateofcompletion'] == null ? '' : event['dateofcompletion'] == null ? '' : event['dateofcompletion'];
            makercheckers = event['makercheckers'] == null ? [] : event['makercheckers'] == null ? [] : event['makercheckers'];
            docsOptional = event['docs'] == null ? [] : event['docs'] == null ? [] : event['docs'];
            documentType = event['documenttype'] == null ? null : event['documenttype'][0] == null ? null : event['documenttype'][0].split(" ")[0];
            console.log('event detail', event);
            //console.log('event detail comments', comments);
            //console.log('event dateofcompletion', dateOfCompletion);
            //console.log('event detail documenttype', documentType);
            const basicFields = ['id', 'shortid', 'entityname', 'locationname', 'functions'];
            const statuteFields = ['jurisdiction', 'country', 'state', 'category', 'subcategory', 'statute'];
            const complianceFields = ['specificity', 'reference', 'obligation', 'penalty', 'authority', 'frequency', 'obligationtype', 'duedate', 'applicability', 'form'];
            const grcFields = ['internalcontrols', 'firstlineofdefence', 'risk', 'riskarea'];
            var html = `
    
      <div class="d-flex justify-between m-20">
        <button part="button-icon" class="material-icons invisible">close</button>
        <h3 part="results-title" class="m-0">Compliance Details</h3>
        <button id="button-detail-close" part="button-icon" class="material-icons">close</button>
      </div>
    
    `;
            if (this.selectedItems.length > 1) {
                html += `
    
        <div class="d-flex justify-between m-20">
          <h4 class="m-0">${this.selectedItems.length - 1} other ` + (this.selectedItems.length === 1 ? `item` : `items`) + ` also selected</h4>
        </div>
    
      `;
            }
            html += '<div class="accordian-container m-20 pb-20" part="accordian-container">';
            html += '<div part="detail-summary">';
            html += ('<div part="detail-summary-title" class="pl-20 pr-20"><h1>' + event['obligationtitle'] + '</h1></div>');
            html += ('<div part="detail-summary-subtitle" class="pl-20 pr-20"><h3>' + event['obligation'] + '</h3></div>');
            html += ('<div part="detail-summary-content" class="pl-20 pr-20">' + ('<sf-i-elastic-text text="' + (event['internalcontrols'] + "").replace(/"/g, "").replace(/\n/g, '<br />') + '" minLength="80"></sf-i-elastic-text>') + '</div>');
            html += '</div>';
            html += '<br />';
            html += '<div class="accordian-section section-basic pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-basic cursor" part="accordian-head">';
            html += '<h3>Basic Information</h3>';
            html += '<h3 class="head-indicator-basic">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-basic" part="accordian-body">';
            for (var i = 0; i < basicFields.length; i++) {
                if (!this.getEventPreviewFields().includes(basicFields[i])) {
                    if (!this.getEventHideFields().includes(basicFields[i])) {
                        html += '<div class="m-20">';
                        html += '<div part="detail-head"><strong>' + basicFields[i] + '</strong></div>';
                        console.log('basicFields', event[basicFields[i]] + "");
                        if ((event[basicFields[i]] + "").indexOf("[") >= 0) {
                            html += this.getEventTexts(basicFields[i], JSON.parse(event[basicFields[i]]), event).replace(/ *\([^)]*\) */g, "").trim();
                        }
                        else {
                            html += '<sf-i-elastic-text text="' + (event[basicFields[i]] + "").replace(/"/g, "").replace(/ *\([^)]*\) */g, "").trim().split(';')[0] + '" minLength="80"></sf-i-elastic-text>';
                        }
                        html += '</div>';
                    }
                }
            }
            if (this.mode == "consumer") {
                if (approved) {
                    html += '<div class="m-20">';
                    html += '<div part="detail-head"><strong>Approved</strong></div>';
                    html += '<span class="material-icons color-done">check_circle</span>';
                    html += '</div>';
                }
            }
            if (docs != null) {
                html += '<div class="m-20">';
                html += '<div part="detail-head"><strong>Documents</strong></div>';
                html += '<span class="material-icons muted">description</span>';
                html += docs.length;
                html += '</div>';
            }
            if (comments != null) {
                html += '<div class="m-20">';
                html += '<div part="detail-head"><strong>Comments</strong></div>';
                html += '<span class="material-icons muted">forum</span>';
                html += comments.length;
                html += '</div>';
            }
            html += '<div class="m-20">';
            html += '<div part="detail-head"><strong>Reporters</strong></div>';
            html += this.getReporterDetailStringFromEvent(event);
            html += '</div>';
            html += '<div class="m-20">';
            html += '<div part="detail-head"><strong>Approvers</strong></div>';
            html += this.getApproverDetailStringFromEvent(event);
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="accordian-section section-statute pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-statute cursor" part="accordian-head">';
            html += '<h3>Statute Information</h3>';
            html += '<h3 class="head-indicator-statute">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-statute" part="accordian-body">';
            for (var i = 0; i < statuteFields.length; i++) {
                if (!this.getEventPreviewFields().includes(statuteFields[i])) {
                    if (!this.getEventHideFields().includes(statuteFields[i])) {
                        html += '<div class="m-20">';
                        html += '<div part="detail-head"><strong>' + statuteFields[i] + '</strong></div>';
                        if ((event[statuteFields[i]] + "").indexOf("[") >= 0) {
                            html += this.getEventTexts(statuteFields[i], JSON.parse(event[statuteFields[i]]), event);
                        }
                        else {
                            html += '<sf-i-elastic-text text="' + (event[statuteFields[i]] + "").replace(/"/g, "") + '" minLength="80"></sf-i-elastic-text>';
                        }
                        html += '</div>';
                    }
                }
            }
            html += '</div>';
            html += '</div>';
            html += '<div class="accordian-section section-compliance pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-compliance" part="accordian-head">';
            html += '<h3>Compliance Information</h3>';
            html += '<h3 class="head-indicator-compliance">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-compliance" part="accordian-body">';
            for (var i = 0; i < complianceFields.length; i++) {
                //console.log(complianceFields[i]);
                //console.log(event[complianceFields[i]]);
                if (!this.getEventPreviewFields().includes(complianceFields[i])) {
                    if (!this.getEventHideFields().includes(complianceFields[i])) {
                        if (event[complianceFields[i]].indexOf('http://') >= 0) {
                            let res = event[complianceFields[i]].split(" ").find((word) => word.startsWith("http"));
                            html += '<div class="m-20">';
                            html += '<div part="detail-head"><strong>' + complianceFields[i] + '</strong></div>';
                            if ((event[complianceFields[i]] + "").indexOf("[") >= 0) {
                                html += this.getEventTexts(complianceFields[i], JSON.parse(event[complianceFields[i]]), event) + "&nbsp;<a href=\"" + res + "\" target=\"_blank\">Open</a>";
                            }
                            else {
                                html += '<sf-i-elastic-text text="' + (event[complianceFields[i]] + "").replace(/"/g, "").replace(/\n/g, '<br />') + '" minLength="80"></sf-i-elastic-text>' + "&nbsp;<a href=\"" + res + "\" target=\"_blank\">Open</a>";
                            }
                            html += '</div>';
                        }
                        else {
                            html += '<div class="m-20">';
                            html += '<div part="detail-head"><strong>' + complianceFields[i] + '</strong></div>';
                            if ((event[complianceFields[i]] + "").indexOf("[") >= 0) {
                                html += this.getEventTexts(complianceFields[i], JSON.parse(event[complianceFields[i]]), event);
                            }
                            else {
                                html += '<sf-i-elastic-text text="' + (event[complianceFields[i]] + "").replace(/"/g, "").replace(/\n/g, '<br />') + '" minLength="80"></sf-i-elastic-text>';
                            }
                            html += '</div>';
                        }
                    }
                }
            }
            html += '</div>';
            html += '</div>';
            html += '<div class="accordian-section section-grc pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-grc" part="accordian-head">';
            html += '<h3>GRC Information</h3>';
            html += '<h3 class="head-indicator-grc">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-grc" part="accordian-body">';
            for (var i = 0; i < grcFields.length; i++) {
                //console.log(grcFields[i]);
                if (!this.getEventPreviewFields().includes(grcFields[i])) {
                    if (!this.getEventHideFields().includes(grcFields[i])) {
                        html += '<div class="m-20">';
                        html += '<div part="detail-head"><strong>' + grcFields[i] + '</strong></div>';
                        if (grcFields[i].toLowerCase() == "riskarea") {
                            const arrValues = event[grcFields[i]];
                            for (var k = 0; k < arrValues.length; k++) {
                                html += '<div part="detail-reporter-name" class="mr-10">' + arrValues[k] + '</div>';
                            }
                        }
                        else {
                            if ((event[grcFields[i]] + "").indexOf("[") >= 0) {
                                html += this.getEventTexts(grcFields[i], JSON.parse(event[grcFields[i]]), event);
                            }
                            else {
                                //console.log('grcfield', event[grcFields[i]]);
                                html += '<sf-i-elastic-text text="' + (event[grcFields[i]] + "").replace(/"/g, "").replace(/\n/g, '<br />') + '" minLength="80"></sf-i-elastic-text>';
                            }
                        }
                        html += '</div>';
                    }
                }
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
            // html += '<div class="d-flex m-20 flex-wrap">';
            // for(var k = 0; k < Object.keys(event).length; k++) {
            //   if(!this.getEventPreviewFields().includes(Object.keys(event)[k])) {
            //     if(!this.getEventHideFields().includes(Object.keys(event)[k])) {
            //       html += '<div class="m-20">';
            //       html += '<div part="detail-head"><strong>'+Object.keys(event)[k]+'</strong></div>'
            //       //console.log(Object.keys(event)[k], event[Object.keys(event)[k]]);
            //       if((event[Object.keys(event)[k]] + "").indexOf("[") >= 0) {
            //         html += this.getEventTexts(Object.keys(event)[k], JSON.parse(event[Object.keys(event)[k]]), event);
            //       } else {
            //         html += '<sf-i-elastic-text text="'+(event[Object.keys(event)[k]] + "").replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
            //       }
            //       html += '</div>';
            //     }
            //   }
            // }
            if (this.mode == "consumer") {
                //console.log('docs received', event['documents']);
                //console.log('docs received', comments);
                //console.log('docs received', approved);
                if (this.myRole == this.TAB_APPROVER || this.myRole == this.TAB_FUNCTION_HEAD) {
                    if (comments.length > 0) {
                        html += '<div class="d-flex justify-between m-20">';
                        html += '<h3 part="results-title" class="m-0"><br />Approve Compliance</h3>';
                        html += '</div>';
                        html += '<div class="m-20" part="report-container">';
                        html += '<div class="d-flex justify-between align-center">';
                        html += '<button class="invisible" part="button">Save</button>';
                        html += '<button id="button-uploader-submit-approve" class="button-submit" part="button">Save</button>';
                        html += '</div>';
                        if (this.myRole != this.TAB_FUNCTION_HEAD && docs.length > 0) {
                            html += '<div class="m-20">';
                            html += '<label part="input-label">Supporting Documents</label>';
                            html += '<slot name="uploader"></slot>';
                            html += '</div>';
                        }
                        html += '<div class="d-flex m-20 flex-col">';
                        html += '<label part="input-label">Approver Comments*</label>';
                        html += '<input id="input-approver-comments" type="text" part="input" value=""/><br />';
                        html += '<label part="input-label">Date of Completion*</label>';
                        html += '<input id="input-approver-doc" part="input" type="date" value="' + (dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0, 10)) + '" disabled/><br />';
                        html += '<div>';
                        html += '<label part="input-label">Approve?*</label><br />';
                        html += '<div class="mt-5">';
                        html += '<input id="input-approve-yes" name="radio-approved" type="radio"/> Yes';
                        html += '<input id="input-approve-no" name="radio-approved" type="radio" checked/> No';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                    }
                }
                if (this.myRole == this.TAB_REPORTER || this.myRole == this.TAB_FUNCTION_HEAD) {
                    html += '<div class="d-flex justify-between m-20">';
                    html += '<h3 part="results-title" class="m-0"><br />Report Compliance</h3>';
                    html += '</div>';
                    var showSubmissionSection = true;
                    var showGoogleFormLink = false;
                    if (event['form'].length > 5) {
                        if (event['form'].indexOf('docs.google.com/forms') >= 0) {
                            showSubmissionSection = false;
                            if (!approved) {
                                showGoogleFormLink = true;
                            }
                        }
                    }
                    if (showGoogleFormLink) {
                        html += ('<div part="detail-summary-form" class="mt-20 pl-20 pr-20"><button part="button" onclick="window.open(\'' + event['form'] + (this.projectId + '_' + entityId + '_' + locationId + '_' + event['id'] + '_' + mmddyyyy) + '\',\'_blank\')">Submit Via Link</button></div>');
                    }
                    if (showSubmissionSection) {
                        html += '<div class="m-20" part="report-container">';
                        html += '<div class="d-flex justify-between align-center">';
                        html += '<button class="invisible" part="button">Save</button>';
                        html += '<button id="button-uploader-submit-report" class="button-submit" part="button">Save</button>';
                        html += '</div>';
                        html += '<div class="d-flex m-20 flex-col">';
                        html += '<label part="input-label">Reporter Comments*</label>';
                        html += '<input id="input-reporter-comments" type="text" part="input" value=""/><br />';
                        html += '<label part="input-label">Date of Completion*</label>';
                        html += '<input id="input-reporter-doc" part="input" type="date" value="' + (dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0, 10)) + '" max="' + (new Date().toISOString().substring(0, 10)) + '"/><br />';
                        // if(docsOptional.length === 0) {
                        html += '<label part="input-label">Supporting Documents' + ((docsOptional.length > 0) ? '' : '*') + '</label>';
                        html += '<slot name="uploader"></slot>';
                        // }
                        html += '<br />';
                        if (makercheckers.length > 0) {
                            html += '<div part="td-head" class="td-head d-flex justify-center align-center"><span class="material-symbols-outlined">check_small</span><div>&nbsp;Auto-approve Enabled</div></div>';
                        }
                        html += '</div>';
                        html += '</div>';
                    }
                }
                if (this.myRole == this.TAB_AUDITOR) {
                    html += '<div class="d-flex justify-between m-20">';
                    html += '<h3 part="results-title" class="m-0"><br />Audit Compliance</h3>';
                    html += '</div>';
                    html += '<div class="m-20" part="report-container">';
                    html += '<div class="d-flex justify-between align-center">';
                    html += '<button class="invisible" part="button">Save</button>';
                    html += '<button id="button-uploader-submit-audit" class="button-submit" part="button">Save</button>';
                    html += '</div>';
                    html += '<div class="d-flex m-20 flex-col">';
                    html += '<label part="input-label">Auditor Comments</label>';
                    html += '<input id="input-auditor-comments" type="text" part="input" value=""/><br />';
                    html += '<label part="input-label">Date of Completion</label>';
                    html += '<input id="input-auditor-doc" part="input" type="date" value="' + (dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0, 10)) + '" max="' + (new Date().toISOString().substring(0, 10)) + '" readonly/><br />';
                    html += '<div>';
                    html += '<label part="input-label">Approve?</label><br />';
                    html += '<div class="mt-5">';
                    html += '<input id="input-approve-yes" name="radio-approved" type="radio" checked/> Yes';
                    html += '<input id="input-approve-no" name="radio-approved" type="radio"/> No';
                    html += '</div>';
                    html += '</div>';
                    html += '<br />';
                    if (docs.length > 0) {
                        html += '<label part="input-label">Supporting Documents</label>';
                        html += '<slot name="uploader"></slot>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
                if (this.myRole == this.TAB_VIEWER) {
                    html += '<div class="d-flex justify-between m-20">';
                    html += '<h3 part="results-title" class="m-0"><br />View Compliance</h3>';
                    html += '</div>';
                    html += '<div class="m-20" part="report-container">';
                    html += '<div class="d-flex m-20 flex-col">';
                    html += '<div>';
                    html += '<label part="input-label">Approve?</label><br />';
                    html += '<div class="mt-5">';
                    html += '<input id="input-approve-yes" name="radio-approved" type="radio" checked/> Yes';
                    html += '<input id="input-approve-no" name="radio-approved" type="radio"/> No';
                    html += '</div>';
                    html += '</div>';
                    html += '<br />';
                    if (docs.length === 0) {
                        html += '<label part="input-label">Supporting Documents</label>';
                        html += '<slot name="uploader"></slot>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
                html += '<div class="d-flex justify-between m-20">';
                html += '<h3 part="results-title" class="m-0"><br />Comments</h3>';
                html += '</div>';
                html += '<div class="m-20">';
                html += '<div class="d-flex flex-col">';
                for (var i = 0; i < comments.length; i++) {
                    html += '<div part="commentbox" class="d-flex commentbox ' + (comments[i].author + "").toLowerCase() + 'box">';
                    html += '<div class="mr-20 d-flex flex-col align-end"><span part="comment-username">' + (comments[i].username != null ? comments[i].username : '') + '</span><span part="td-head">' + comments[i].author + '</span>' + ((i === (comments.length - 1) && this.enableDeleteLatestReport) ? '<br /><button class="mt-5 button-delete" part="button">Delete</button>' : '') + '</div>';
                    const onlyCommentText = (comments[i].comment + "").replace(/ *\([^)]*\) */g, "").trim();
                    try {
                        const jsonComments = JSON.parse(onlyCommentText);
                        if (Util.isInteger(jsonComments)) {
                            html += '<div class="">' + comments[i].comment + '<br /><small><span class="muted">' + comments[i].timestamp + '</span></small></div>';
                        }
                        else {
                            //console.log('json comments', jsonComments);
                            var htmlTable = '';
                            for (var j = 0; j < Object.keys(jsonComments).length; j++) {
                                htmlTable += '<div class="mb-20">';
                                htmlTable += ('<div part="detail-head">' + Object.keys(jsonComments)[j] + '</div>');
                                htmlTable += ('<sf-i-elastic-text text="' + jsonComments[Object.keys(jsonComments)[j]] + '" minLength="20"></sf-i-elastic-text>');
                                htmlTable += '</div>';
                            }
                            html += '<div class="">' + htmlTable + '<small><span class="muted">' + comments[i].timestamp + '</span></small></div>';
                        }
                    }
                    catch (e) {
                        //console.log('json comments exception', comments[i]);
                        html += '<div class="">' + comments[i].comment + '<br /><small><span class="muted">' + comments[i].timestamp + '</span></small></div>';
                    }
                    html += '</div>';
                }
                if (comments.length === 0) {
                    html += '<div><strong>No comments yet!</strong></div>';
                }
                html += '</div>';
                html += '</div>';
                if (event.reportevent != null) {
                    html += '<div class="d-flex justify-between m-20">';
                    html += '<h3 part="results-title" class="m-0"><br />Reported Event Details</h3>';
                    html += '</div>';
                    html += '<div class="m-20">';
                    html += '<div class="w-100p scroll-x">';
                    const jsonReportEvent = JSON.parse(event.reportevent);
                    html += '<table>';
                    html += '<tr>';
                    for (i = 0; i < Object.keys(jsonReportEvent).length; i++) {
                        if (!this.EXCLUDE_COLS_FROM_REGS.includes(Object.keys(jsonReportEvent)[i].toLowerCase())) {
                            html += '<td part="td-body-register">';
                            html += ('<span part="td-head" style="padding-left: 0px !important">' + Object.keys(jsonReportEvent)[i] + '</span>');
                            html += ('<span part="td-body"><sf-i-elastic-text text="' + jsonReportEvent[Object.keys(jsonReportEvent)[i]] + '" lineSize="4" minLength="60"></sf-i-elastic-text>' + '</span>');
                            html += '</td>';
                        }
                    }
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '<div>';
                }
            }
            this._SfDetailContainer.innerHTML = html;
            (_a = this._SfDetailContainer.querySelector('.button-delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                await this.fetchDeleteReview(event["id"], mmddyyyy, entityId, locationId);
                this.setSuccess('Deleted successfully!');
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
                //console.log('deleted', resultDelete);
                if (this.getCurrentTab() == this.TAB_CUSTOM) {
                    this.processDateSelection(this._SfCustomContainer);
                }
                else {
                    if (currentColumnButton != null) {
                        currentColumnButton.click();
                    }
                }
                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                this._SfDetailContainer.querySelector('#button-detail-close').dispatchEvent(clickEvent);
            });
            (_b = this._SfDetailContainer.querySelector('#button-detail-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this._SfDetailContainer.innerHTML = '';
                this._SfDetailContainer.style.display = 'none';
            });
            (_c = this._SfDetailContainer.querySelector('.head-basic')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                //console.log('head basic clicked', ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display);
                if (this._SfDetailContainer.querySelector('.body-basic').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-basic').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-basic').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-basic').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-basic').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-basic').innerHTML = '-';
                }
            });
            (_f = this._SfDetailContainer.querySelector('.head-statute')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
                //console.log('head statute clicked', ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-statute') as HTMLDivElement).style.display);
                if (this._SfDetailContainer.querySelector('.body-statute').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-statute').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-statute').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-statute').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-statute').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-statute').innerHTML = '-';
                }
            });
            (_g = this._SfDetailContainer.querySelector('.head-compliance')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
                if (this._SfDetailContainer.querySelector('.body-compliance').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-compliance').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-compliance').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-compliance').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-compliance').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-compliance').innerHTML = '-';
                }
            });
            (_h = this._SfDetailContainer.querySelector('.head-grc')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', () => {
                if (this._SfDetailContainer.querySelector('.body-grc').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-grc').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-grc').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-grc').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-grc').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-grc').innerHTML = '-';
                }
            });
            if (this.mode == "consumer") {
                (_k = this._SfDetailContainer.querySelector('#button-uploader-submit-approve')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', async () => {
                    const comments = this._SfDetailContainer.querySelector('#input-approver-comments').value;
                    const approved = this._SfDetailContainer.querySelector('#input-approve-yes').checked;
                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    this._SfDetailContainer.querySelector('#button-detail-close').dispatchEvent(clickEvent);
                    // await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], comments, approved)
                    if (this.selectedItems.length === 0) {
                        await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], comments, approved);
                    }
                    else {
                        for (var k = 0; k < this.selectedItems.length; k++) {
                            const selectedId = this.selectedItems[k];
                            //console.log('selectedid', selectedId);
                            entityId = selectedId.split('-')[7].replace(/_/g, '-');
                            locationId = selectedId.split('-')[8].replace(/_/g, '-');
                            const eventId = selectedId.split('-')[9].replace(/_/g, '-');
                            mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];
                            //console.log(entityId, locationId, eventId, mmddyyyy);
                            await this.uploadReview(entityId, locationId, mmddyyyy, eventId, comments, approved);
                            this.setSuccess("Updating, please wait...");
                            await this.sleep(2000);
                            this.clearMessages();
                        }
                    }
                    if (this.getCurrentTab() == this.TAB_CUSTOM) {
                        this.processDateSelection(this._SfCustomContainer);
                    }
                    else {
                        if (currentColumnButton != null) {
                            currentColumnButton.click();
                        }
                    }
                });
                (_l = this._SfDetailContainer.querySelector('#button-uploader-submit-audit')) === null || _l === void 0 ? void 0 : _l.addEventListener('click', async () => {
                    const comments = this._SfDetailContainer.querySelector('#input-auditor-comments').value;
                    const approved = this._SfDetailContainer.querySelector('#input-approve-yes').checked;
                    if (comments.trim().length === 0) {
                        this.setError('Comments cannot be blank!');
                        setTimeout(() => {
                            this.clearMessages();
                        }, 3000);
                    }
                    else {
                        if (this.selectedItems.length === 0) {
                            await this.uploadAudit(entityId, locationId, mmddyyyy, event["id"], comments, approved);
                        }
                        else {
                            for (var k = 0; k < this.selectedItems.length; k++) {
                                const selectedId = this.selectedItems[k];
                                //console.log('selectedid', selectedId);
                                entityId = selectedId.split('-')[7].replace(/_/g, '-');
                                locationId = selectedId.split('-')[8].replace(/_/g, '-');
                                const eventId = selectedId.split('-')[9].replace(/_/g, '-');
                                mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];
                                //console.log(entityId, locationId, eventId, mmddyyyy);
                                await this.uploadAudit(entityId, locationId, mmddyyyy, eventId, comments, approved);
                            }
                        }
                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        this._SfDetailContainer.querySelector('#button-detail-close').dispatchEvent(clickEvent);
                        if (this.getCurrentTab() == this.TAB_CUSTOM) {
                            this.processDateSelection(this._SfCustomContainer);
                        }
                        else {
                            if (currentColumnButton != null) {
                                currentColumnButton.click();
                            }
                        }
                    }
                });
                if (this.myRole == this.TAB_REPORTER || this.myRole == this.TAB_FUNCTION_HEAD) {
                    if (approved) {
                        if (this._SfDetailContainer.querySelector('#button-uploader-submit-report') != null) {
                            this._SfDetailContainer.querySelector('#button-uploader-submit-report').style.visibility = 'hidden';
                        }
                    }
                    else {
                        if (this._SfDetailContainer.querySelector('#button-uploader-submit-report') != null) {
                            this._SfDetailContainer.querySelector('#button-uploader-submit-report').style.visibility = 'visible';
                            (_m = this._SfDetailContainer.querySelector('#button-uploader-submit-report')) === null || _m === void 0 ? void 0 : _m.addEventListener('click', async () => {
                                const reportercomments = this._SfDetailContainer.querySelector('#input-reporter-comments').value;
                                //console.log('reporter comments 1', reportercomments);
                                const reporterdoc = this._SfDetailContainer.querySelector('#input-reporter-doc').value.length > 0 ? (new Date(this._SfDetailContainer.querySelector('#input-reporter-doc').value).getTime() + "") : "";
                                let docs = [];
                                //console.log('reporter comments 2', reportercomments);
                                // if(docsOptional.length === 0) {
                                docs = this._SfUploader[0].querySelector('#uploader').selectedValues();
                                // }
                                //console.log('docs', docs);
                                if (docs.length === 0 && docsOptional.length === 0) {
                                    //console.log('reporter comments 3', reportercomments);
                                    this.setError('No documents uploaded!');
                                    setTimeout(() => {
                                        this.clearMessages();
                                    }, 3000);
                                }
                                else {
                                    //console.log('reporterdoc', reporterdoc);
                                    if (reporterdoc.length === 0) {
                                        this.setError('Date of completion not selected!');
                                        setTimeout(() => {
                                            this.clearMessages();
                                        }, 3000);
                                    }
                                    else {
                                        //console.log('makerscheckers 1', reportercomments);
                                        if (reportercomments.trim().length === 0) {
                                            this.setError('Comments cannot be blank!');
                                            setTimeout(() => {
                                                this.clearMessages();
                                            }, 3000);
                                        }
                                        else {
                                            var clickEvent = new MouseEvent("click", {
                                                "view": window,
                                                "bubbles": true,
                                                "cancelable": false
                                            });
                                            this._SfDetailContainer.querySelector('#button-detail-close').dispatchEvent(clickEvent);
                                            if (this.selectedItems.length === 0) {
                                                //console.log('makerscheckers', makercheckers, reportercomments);
                                                await this.uploadReport(entityId, locationId, mmddyyyy, event["id"], reportercomments, reporterdoc, docs, event);
                                                if (makercheckers.length > 0) {
                                                    await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], "Auto approved", true);
                                                }
                                            }
                                            else {
                                                for (var k = 0; k < this.selectedItems.length; k++) {
                                                    const selectedId = this.selectedItems[k];
                                                    //console.log('selectedid', selectedId);
                                                    const makercheckersL = selectedId.split('-')[5];
                                                    entityId = selectedId.split('-')[7].replace(/_/g, '-');
                                                    locationId = selectedId.split('-')[8].replace(/_/g, '-');
                                                    const eventId = selectedId.split('-')[9].replace(/_/g, '-');
                                                    mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];
                                                    //console.log(entityId, locationId, eventId, mmddyyyy);
                                                    await this.uploadReport(entityId, locationId, mmddyyyy, eventId, reportercomments, reporterdoc, docs, event);
                                                    if (parseInt(makercheckersL) > 0) {
                                                        await this.uploadReview(entityId, locationId, mmddyyyy, eventId, "Auto approved", true);
                                                    }
                                                    this.setSuccess("Updating, please wait...");
                                                    await this.sleep(2000);
                                                    this.clearMessages();
                                                }
                                            }
                                            if (this.getCurrentTab() == this.TAB_CUSTOM) {
                                                this.processDateSelection(this._SfCustomContainer);
                                            }
                                            else {
                                                if (currentColumnButton != null) {
                                                    currentColumnButton.click();
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                if (this._SfUploader[0] != null) {
                    this._SfUploader[0].querySelector('#uploader').addEventListener('uploadCompleted', (_ev) => {
                        //console.log(ev);
                    });
                    //console.log('documentType checking', documentType);
                    if (documentType != null) {
                        this._SfUploader[0].querySelector('#uploader').docType = documentType;
                    }
                    this._SfUploader[0].querySelector('#uploader').prepopulatedInputArr = JSON.stringify([]);
                    this._SfUploader[0].querySelector('#uploader').loadMode();
                    if (docs.length > 0) {
                        this._SfUploader[0].querySelector('#uploader').prepopulatedInputArr = JSON.stringify(docs);
                        this._SfUploader[0].querySelector('#uploader').loadMode();
                    }
                    if (this.myRole == this.TAB_APPROVER || approved) {
                        this._SfUploader[0].querySelector('#uploader').readOnly = true;
                        this._SfUploader[0].querySelector('#uploader').loadMode();
                    }
                    else {
                        this._SfUploader[0].querySelector('#uploader').readOnly = false;
                        this._SfUploader[0].querySelector('#uploader').loadMode();
                    }
                    const dataPassthrough = {
                        projectId: this.projectId,
                        countryId: this.countryId,
                        entityId: entityId,
                        locationId: locationId,
                        mmddyyyy: mmddyyyy,
                        complianceId: event['id'],
                        path: "uploadextract"
                    };
                    const callbackUrlHost = "8icpy39ru0.execute-api.us-east-1.amazonaws.com";
                    const callbackUrlPath = "test/uploadextract";
                    this._SfUploader[0].querySelector('#uploader').projectId = this.projectId;
                    this._SfUploader[0].querySelector('#uploader').dataPassthrough = JSON.stringify(dataPassthrough);
                    this._SfUploader[0].querySelector('#uploader').callbackUrlHost = callbackUrlHost;
                    this._SfUploader[0].querySelector('#uploader').callbackUrlPath = callbackUrlPath;
                    this._SfUploader[0].querySelector('#uploader').loadMode();
                }
                //console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
                if (this.myRole == this.TAB_APPROVER || this.myRole == this.TAB_VIEWER || this.myRole == this.TAB_AUDITOR || this.myRole == this.TAB_FUNCTION_HEAD) {
                    //console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
                    if (event["approved"] != null) {
                        if (event["approved"] === true) {
                            //console.log('approved 2', event["approved"], this.myRole, this.TAB_APPROVER);
                            if (this._SfDetailContainer.querySelector('#input-approve-yes') != null) {
                                this._SfDetailContainer.querySelector('#input-approve-yes').checked = true;
                            }
                            if (this._SfDetailContainer.querySelector('#input-approve-no') != null) {
                                this._SfDetailContainer.querySelector('#input-approve-no').checked = false;
                            }
                        }
                        else {
                            if (this._SfDetailContainer.querySelector('#input-approve-yes') != null) {
                                this._SfDetailContainer.querySelector('#input-approve-yes').checked = false;
                            }
                            if (this._SfDetailContainer.querySelector('#input-approve-no') != null) {
                                this._SfDetailContainer.querySelector('#input-approve-no').checked = true;
                            }
                        }
                    }
                    else {
                        if (this._SfDetailContainer.querySelector('#input-approve-yes') != null) {
                            this._SfDetailContainer.querySelector('#input-approve-yes').checked = false;
                        }
                        if (this._SfDetailContainer.querySelector('#input-approve-no') != null) {
                            this._SfDetailContainer.querySelector('#input-approve-no').checked = true;
                        }
                    }
                }
            }
        };
        this.renderCalendar = () => {
            //console.log('redering calendar', this.events);
            var _a;
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var html = '';
            for (var i = 0; i < 12; i++) {
                const monthStatus = this.getMonthStatus(startDate.getMonth(), startDate.getFullYear());
                //console.log('monthstatus', monthStatus);
                const partApproved = this.COLOR_APPROVED + ' 0%, ' + this.COLOR_APPROVED + ' ' + parseInt(monthStatus['percApproved'] + '') + '%';
                const partPendingApproval = this.COLOR_PENDING_APPROVAL + ' ' + parseInt(monthStatus['percApproved'] + '') + '%, ' + this.COLOR_PENDING_APPROVAL + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + '%';
                const partRejected = this.COLOR_REJECTED + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + '%, ' + this.COLOR_REJECTED + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + parseInt(monthStatus['percRejected'] + '') + '%';
                const partNotStarted = this.COLOR_NOT_STARTED + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + parseInt(monthStatus['percRejected'] + '') + '%, ' + this.COLOR_NOT_STARTED + ' ' + 100 + '%';
                html += '<div class="calendar-item d-flex flex-col flex-grow" part="calendar-month" style="background: linear-gradient(to right, ' + partApproved + ',' + partPendingApproval + ',' + partRejected + ',' + partNotStarted + ');">';
                html += '<div part="bg-calendar" class="d-flex justify-between align-center p-10">';
                html += '<div part="month-title" class="title-item">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
                html += '<button id="calendar-button-' + i + '" part="button-icon-small-light" class="title-item material-icons">open_in_new</button>';
                html += '</div>';
                html += this.insertDayNames();
                html += this.insertDates(startDate.getMonth(), startDate.getFullYear());
                html += '</div>';
                startDate.setMonth(startDate.getMonth() + 1);
            }
            this._SfCalendarContainer.innerHTML = html;
            for (var i = 0; i < 12; i++) {
                (_a = this._SfCalendarContainer.querySelector('#calendar-button-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const id = ev.target.id.split("-")[2];
                    //console.log('render stream', id);
                    this.enableStream();
                    this.renderTabs(this.TAB_STREAM);
                    this.renderStream(parseInt(id));
                });
            }
        };
        this.matchesOnBoardingFilter = (country, state, subcategory, statute) => {
            console.log('matchingonboarding', country, state, subcategory, '-' + statute + '-');
            let matchesCountry = false;
            for (var i = 0; i < this.getfilterOnboarding().length; i++) {
                matchesCountry = false;
                if (country.toLowerCase().trim().indexOf(this.getfilterOnboarding()[i].country.trim().toLowerCase()) >= 0) {
                    matchesCountry = true;
                    let matchesState = false;
                    let matchesSubcategory = false;
                    //console.log('matchingonboarding', matchesCountry, statute);
                    for (var j = 0; j < this.getfilterOnboarding()[i].states.length; j++) {
                        //if(state.toLowerCase().indexOf(this.getfilterOnboarding()[i].states[j].toLowerCase()) >= 0) {
                        if (this.getfilterOnboarding()[i].states[j].toLowerCase().indexOf(state.toLowerCase()) >= 0) {
                            matchesState = true;
                            break;
                        }
                    }
                    //console.log('matchingonboarding', matchesState, statute);
                    for (var j = 0; j < this.getfilterOnboarding()[i].subcategories.length; j++) {
                        if (subcategory.toLowerCase().trim().indexOf(this.getfilterOnboarding()[i].subcategories[j].toLowerCase().trim()) >= 0) {
                            matchesSubcategory = true;
                        }
                    }
                    //console.log('matchingonboarding', matchesSubcategory, statute);
                    let isNotExcludedStatute = true;
                    if (this.getfilterOnboarding()[i].excludestatutes != null) {
                        if (this.getfilterOnboarding()[i].excludestatutes.includes(statute.trim())) {
                            isNotExcludedStatute = false;
                        }
                    }
                    let isIncludedStatute = false;
                    if (this.getfilterOnboarding()[i].includestatutes != null) {
                        if (this.getfilterOnboarding()[i].includestatutes.includes(statute.trim())) {
                            isIncludedStatute = true;
                        }
                    }
                    if (statute == "Gujarat Goods and Services Tax Act, 2017 + Gujarat Goods and Services Tax Rules, 2017") {
                        console.log('isIncludedStatute', isIncludedStatute);
                    }
                    //console.log('matchingonboarding', isIncludedStatute, this.getfilterOnboarding()[i].includestatutes, '='+statute);
                    if (matchesCountry && matchesState && matchesSubcategory && isNotExcludedStatute) {
                        //console.log('matchingonboarding return true');
                        return true;
                    }
                    if (matchesCountry && isIncludedStatute) {
                        //console.log('matchingonboarding return true');
                        return true;
                    }
                }
            }
            //console.log('matchingonboarding return true');
            return false;
        };
        this.applyAndReloadTagging = (e, colName, taggingArray, sourceArray, divElement) => {
            const selectedIndex = e.currentTarget.id.split('-')[1];
            // taggingArray.data.mappings.mappings = [];
            const tempArray = [];
            for (var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {
                //console.log('selectedindexchecking', selectedIndex, count, this.selectedCbs.includes(selectedIndex), this.selectedCbs.includes(count));
                //taggingArray.data.mappings.mappings[count] = sourceArray.data.mappings.mappings[count];
                //taggingArray.data.mappings.mappings.push(sourceArray.data.mappings.mappings[count]);
                tempArray.push(sourceArray.data.mappings.mappings[count]);
                // //console.log('selectedindexchecking', this.selectedCbs, count, this.selectedCbs.includes(selectedIndex), this.selectedCbs.includes(count));
                if (this.selectedCbs.includes(selectedIndex) && this.selectedCbs.includes(count + '')) {
                    if (divElement.querySelector('#tags-' + selectedIndex).selectedValues != null) {
                        if (tempArray[count] == null)
                            tempArray[count] = {};
                        tempArray[count][colName] = divElement.querySelector('#tags-' + selectedIndex).selectedValues();
                        // //console.log('selectedindexchecking A');
                        // if(taggingArray.data.mappings.mappings[count] == null) taggingArray.data.mappings.mappings[count] = {};
                        // taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as SfIForm).selectedValues();
                    }
                    else {
                        //console.log('selectedindexchecking B');
                        if (tempArray[count] == null)
                            tempArray[count] = {};
                        tempArray[count][colName] = divElement.querySelector('#tags-' + selectedIndex).value;
                        // if(taggingArray.data.mappings.mappings[count] == null) taggingArray.data.mappings.mappings[count] = {};
                        // taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as HTMLInputElement).value;
                    }
                }
                else {
                    if (divElement.querySelector('#tags-' + count).selectedValues != null) {
                        if (tempArray[count] == null)
                            tempArray[count] = {};
                        tempArray[count][colName] = divElement.querySelector('#tags-' + count).selectedValues();
                    }
                    else {
                        //console.log('selectedindexchecking D');
                        if (tempArray[count] == null)
                            tempArray[count] = {};
                        tempArray[count][colName] = divElement.querySelector('#tags-' + count).value;
                        // if(taggingArray.data.mappings.mappings[count] == null) taggingArray.data.mappings.mappings[count] = {};
                        // taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + count) as HTMLInputElement).value;
                    }
                }
            }
            taggingArray.data.mappings.mappings = tempArray;
            //console.log('selectedindexchecking', colName, taggingArray);
        };
        this.getDataValue = (jsonData, id) => {
            let ret = null;
            //console.log('pushing up again..', id, jsonData);
            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].id == id) {
                    return jsonData[i].data.data;
                }
            }
            return ret;
        };
        this.getColsValue = (jsonData, id) => {
            let ret = null;
            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].id == id) {
                    return jsonData[i].data.cols;
                }
            }
            return ret;
        };
        this.saveMapping = async (divElement, uploadBlock, jsonData, extraFields, searchString, uploadFunction, refreshFunction, saveInBackground = false) => {
            const process = async () => {
                const tableRowArr = divElement.querySelectorAll('.tablerow');
                const checkboxArr = divElement.querySelectorAll('.checkbox-row');
                const statuteArr = divElement.querySelectorAll('.statute');
                //console.log(tableRowArr);
                //console.log(checkboxArr);
                //console.log(statuteArr);
                for (var i = 0; i < statuteArr.length; i++) {
                    //console.log((statuteArr[i] as SfIElasticText).text);
                }
                let updatedRows = [];
                let jsonArr = [];
                if (uploadBlock < 0) {
                    for (var i = 0; i < checkboxArr.length; i++) {
                        //console.log('tablerow', (tableRowArr[i] as HTMLTableRowElement));
                        if (tableRowArr[i].style.display == 'none') {
                        }
                        else {
                            updatedRows.push(statuteArr[i].text);
                        }
                        var dataToBePushed = { id: statuteArr[i].text, selected: checkboxArr[i].checked, data: this.getDataValue(jsonData, statuteArr[i].text), cols: this.getColsValue(jsonData, statuteArr[i].text), extraFields: [], updatedFields: [] };
                        for (var j = 0; j < extraFields.length; j++) {
                            const inputArr = divElement.querySelectorAll('.extra-field-' + j);
                            const value = inputArr[i].getValues();
                            // //console.log('value', value);
                            dataToBePushed.extraFields.push(value);
                            if (j === 0) {
                                const fields = inputArr[i].getFields();
                                dataToBePushed.updatedFields.push(...fields);
                            }
                        }
                        jsonArr.push(dataToBePushed);
                    }
                    //console.log('jsonArr', jsonArr);
                    //console.log('updatedRows', updatedRows);
                    const batchNum = new Date().getTime();
                    await uploadFunction({ "searchstring": searchString, "mappings": jsonArr, "batch": batchNum, "updatedrows": updatedRows });
                }
                else {
                    const batchNum = new Date().getTime();
                    for (var i = 0; i < checkboxArr.length; i += uploadBlock) {
                        if (tableRowArr[i].style.display == 'none') {
                        }
                        else {
                            updatedRows.push(statuteArr[i].text);
                        }
                        jsonArr = [];
                        for (var k = i; k < (i + uploadBlock) && k < checkboxArr.length; k++) {
                            if (statuteArr[k] != null) {
                                var dataToBePushed = { id: statuteArr[k].text, selected: checkboxArr[k].checked, data: this.getDataValue(jsonData, statuteArr[k].text), cols: this.getColsValue(jsonData, statuteArr[k].text), extraFields: [], updatedFields: [] };
                                for (var j = 0; j < extraFields.length; j++) {
                                    const inputArr = divElement.querySelectorAll('.extra-field-' + j);
                                    const value = inputArr[k].getValues();
                                    dataToBePushed.extraFields.push(value);
                                    if (j === 0) {
                                        const fields = inputArr[i].getFields();
                                        dataToBePushed.updatedFields.push(...fields);
                                    }
                                }
                                jsonArr.push(dataToBePushed);
                            }
                        }
                        //console.log('jsonArr', i, jsonArr);
                        //console.log('updatedRows', updatedRows);
                        await uploadFunction({ "searchstring": searchString, "mappings": jsonArr, "percentage": parseInt(((k * 100) / checkboxArr.length) + ""), "batch": batchNum, "updatedrows": updatedRows });
                        // await this.sleepFunction(2000);
                    }
                }
                if (!saveInBackground)
                    refreshFunction();
            };
            if (this.disablesave == "yes") {
                return;
            }
            if (saveInBackground) {
                if (this.AUTOSAVE_FLAG) {
                    this.AUTOSAVE_FLAG = false;
                    setTimeout(async () => {
                        await process();
                        this.AUTOSAVE_FLAG = true;
                        this.setSuccess('Autosaved');
                        setTimeout(() => {
                            this.clearMessages();
                        }, 1000);
                    }, 5000);
                }
            }
            else {
                process();
            }
        };
        this.saveTagging = async (mapping, uploadFunction, refreshFunction, saveInBackground) => {
            async function process() {
                //console.log('Saving...', mapping);
                await uploadFunction(mapping);
                if (!saveInBackground)
                    refreshFunction();
            }
            if (this.disablesave == "yes") {
                return;
            }
            if (saveInBackground) {
                if (this.AUTOSAVE_FLAG) {
                    this.AUTOSAVE_FLAG = false;
                    setTimeout(async () => {
                        await process();
                        this.AUTOSAVE_FLAG = true;
                        this.setSuccess('Autosaved');
                        setTimeout(() => {
                            this.clearMessages();
                        }, 1000);
                    }, 10000);
                }
            }
            else {
                process();
            }
        };
        this.renderTaggingTable = (divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols, apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, subfilter) => {
            // source array is the serialized field mappedcompliances
            // tagging array is the tagged array mappedcountries
            var _a;
            //console.log('divelement', divElement);
            //console.log('sourcearray', sourceArray);
            //console.log('taggingarray', taggingArray);
            //console.log('uniqcols', uniqCols);
            //console.log('subfiltervalue', subfilter);
            //console.log('arrFeedbackReference', arrFeedbackReference);
            this.selectedCbs = [];
            if (taggingArray.length === 0 || sourceArray.length === 0)
                return;
            const foundArr = [];
            if (taggingArray.data.mappings != null) {
                for (var i = 0; i < taggingArray.data.mappings.mappings.length; i++) {
                    var found = false;
                    for (var j = 0; j < sourceArray.data.mappings.mappings.length; j++) {
                        var equal = true;
                        for (var k = 0; k < uniqCols.length; k++) {
                            if (sourceArray.data.mappings.mappings[j] != null && taggingArray.data.mappings.mappings[i] != null) {
                                if (sourceArray.data.mappings.mappings[j][uniqCols[k]] != taggingArray.data.mappings.mappings[i][uniqCols[k]]) {
                                    equal = false;
                                }
                            }
                        }
                        if (equal) {
                            found = true;
                        }
                    }
                    if (found) {
                        foundArr.push(taggingArray.data.mappings.mappings[i]);
                    }
                }
            }
            if (taggingArray.data.mappings == null) {
                taggingArray.data.mappings = {};
            }
            taggingArray.data.mappings.mappings = foundArr;
            let mandatoryPresent = true;
            for (i = 0; i < mandatoryFields.length; i++) {
                for (var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {
                    if (taggingArray.data.mappings.mappings[j][mandatoryFields[i]] == null) {
                        mandatoryPresent = false;
                    }
                }
            }
            var tagged = 0;
            for (var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {
                if (taggingArray.data.mappings.mappings[j] != null) {
                    if (taggingArray.data.mappings.mappings[j][colName] != null && taggingArray.data.mappings.mappings[j][colName].length > 0) {
                        tagged++;
                    }
                }
            }
            // let colCountry = -1;
            // let colState = -1;
            // let colSubcategory = -1;
            // let colStatute = -1;
            const unfilteredDict = [];
            var html = '';
            var showTable = true;
            html += '<div class="d-flex justify-between flex-wrap align-center"> ';
            // if(jobs && jobs.data) {
            //   html += (jobs.data.status == "0" ? "<div part=\"results-title\" class=\"left-sticky d-flex align-center mb-10 mr-10\"><span class=\"color-not-started material-icons\">schedule</span>&nbsp; Job initizalied</div>" : jobs.data.status == "1" ? "<div  part=\"results-title\" class=\"left-sticky d-flex align-center mb-10 mr-10\"><span class=\"color-pending material-icons\">pending</span>&nbsp; Job in-progress&nbsp; "+parseInt(jobs.data.progress)+"% complete</div>" : "<div part=\"results-title\" class=\"left-sticky d-flex align-center mb-10 mr-10\"><span class=\"color-done material-icons\">check_circle</span>&nbsp; Job complete</div>" );
            //   if(jobs.data.status == "0" || jobs.data.status == "1") {
            //     showTable = false;
            //   }
            // }
            var status = '';
            if (tagged < sourceArray.data.mappings.mappings.length) {
                status = '<span class="color-pending material-icons">pending</span>';
            }
            else {
                status = '<span class="color-done material-icons">check_circle</span>';
            }
            var mandatoryStatus = '';
            if (!mandatoryPresent) {
                mandatoryStatus = '<span class="color-late-executed material-icons">error</span>&nbsp;&nbsp;Mandatory fields are not present';
            }
            else {
                mandatoryStatus = '<span class="color-done material-icons">check_circle</span>&nbsp;&nbsp;Mandatory fields are present';
            }
            if (showTable) {
                html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0")) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 id="mapped-stats-title" part="results-title" class="d-flex align-center m-0">' + status + '&nbsp;&nbsp;Mapped ' + tagged + ' out of ' + sourceArray.data.mappings.mappings.length + '</h4></div>');
            }
            else {
                html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0")) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 id="mapped-stats-title" part="results-title" class="d-flex align-center m-0">' + status + '&nbsp;&nbsp;Mapped ' + tagged + ' out of ' + sourceArray.data.mappings.mappings.length + '</h4></div>');
            }
            html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0")) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 part="results-title" class="d-flex align-center m-0">' + mandatoryStatus + '</h4></div>');
            html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0")) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 id="span-extra-filled" class="m-0" part="results-title"></h4></div>');
            html += '<div class="d-flex align-center">';
            // html += '<input part="input" type="text" placeholder="Filter" class="input-filter mr-10" value="'+subfilter+'" />';
            html += '<div class="mr-10">';
            html += '<div class="d-flex justify-end"><button part="calendar-tab-icon-not-selected" class="material-icons button-toggle-more">expand_more</button><button part="calendar-tab-icon-selected" class="material-icons button-toggle-more-back hide">expand_less</button></div>';
            // html += '<div class="d-flex justify-end"><button part="button" class="align-center button-download-backups hide" style="position: absolute; margin-top: 5px;"><span class="material-symbols-outlined mr-10">file_save</span><span>Download Backups</span></button></div>'
            html += '<div style="position: absolute; margin-top: 5px;"><button part="button" class="hide d-flex align-center button-download-backups" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">file_save</span><span>Download Backups</span></button><button part="button" class="mt-10 hide d-flex align-center button-export-mapping" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">export_notes</span><span>Export Mapping</span></button></div>';
            html += '</div>';
            console.log('jobs', jobs);
            html += ((jobs == null || jobs.data == null) ? '<button part="button" class="button-apply d-flex align-center mr-10"><span class="material-symbols-outlined mr-10">touch_app</span><span>Apply</span></button><button part="button" class="button-save d-flex align-center"><span class="material-symbols-outlined mr-10">save</span><span>Save</span></button>' : ((jobs.data.status == "1" || jobs.data.status == "0") ? '<button part="button" class="button-cancel">Cancel Job</button>' : (this.disablesave == "yes" ? '' : '<button part="button" class="button-apply d-flex align-center mr-10"><span class="material-symbols-outlined mr-10">touch_app</span><span>Apply</span></button><button part="button" class="button-save d-flex align-center"><span class="material-symbols-outlined mr-10">save</span><span>Save</span></button>')));
            html += '</div>';
            html += '</div>';
            html += '<div>';
            html += '<h4 id="span-filtered" part="results-title"></h4>';
            html += '<div id="div-subfiltered"></div>';
            html += '</div>';
            html += '<br />';
            var subfiltered = 0;
            if (showTable) {
                // for(var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {
                //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "country") {
                //     //console.log('colstate-setting country', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
                //     colCountry = j;
                //   }
                //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "state") {
                //     //console.log('colstate-setting state', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
                //     colState = j;
                //   }
                //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "subcategory") {
                //     //console.log('colstate-setting subcategory', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
                //     colSubcategory = j;
                //   }
                //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "statute") {
                //     //console.log('colstate-setting statute', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
                //     colStatute = j;
                //   }
                // }
                html += '<table id="table-data" class="mt-20" style="height: 200px">';
                html += '<thead>';
                html += '<th part="td-head" class="td-head">';
                html += '<div id="select-all"><input class="checkbox checkbox-all" part="input-checkbox" type="checkbox" ' + ((this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '') + '/></div>';
                html += '</th>';
                for (var i = 0; i < extraFields.length; i++) {
                    html += '<th part="td-head" class="td-head">';
                    html += extraFields[i];
                    html += '</th>';
                }
                html += '<th part="td-head" class="td-head">';
                html += colName;
                html += '</th>';
                // if(arrFeedbackReference != null) {
                //   html += '<th part="td-head" class="td-head">'
                //   html += proposedUsersLabel;
                //   html += '</th>'
                // }
                for (i = 0; i < uniqCols.length; i++) {
                    html += '<th part="td-head" class="td-head">';
                    html += uniqCols[i];
                    html += '</th>';
                }
                for (i = 0; i < sourceCols.length; i++) {
                    html += '<th part="td-head" class="td-head">';
                    html += sourceCols[i];
                    html += '</th>';
                }
                // for(i = 0; i < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; i++) {
                //   html += '<th part="td-head" class="td-head">'
                //   html += JSON.parse(sourceArray.data.mappings.mappings[0].cols)[i];
                //   html += '</th>'
                // }
                html += '</thead>';
                html += '<tbody>';
                for (i = 0; i < sourceArray.data.mappings.mappings.length; i++) {
                    var showSearch = false;
                    if (subfilter == "") {
                        //console.log('showsearch true 1');
                        showSearch = true;
                    }
                    // check showSearch in extra fields
                    // if(!showSearch) {
                    //   for(var j = 0; j < extraFields.length; j++) {
                    //     var k = 0;
                    //     for(k = 0; k < taggingArray.data.mappings.mappings.length; k++) {
                    //       if(taggingArray.data.mappings.mappings[k].id == sourceArray.data.mappings.mappings[i].id) {
                    //         break;
                    //       }
                    //     }
                    //     if(k < taggingArray.data.mappings.mappings.length) {
                    //       try {
                    //         if(taggingArray.data.mappings.mappings[k].extraFields != null && taggingArray.data.mappings.mappings[k].extraFields[j] != null && taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                    //           //console.log('showsearch true 2', taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase(), subfilter);
                    //           showSearch = true;
                    //           subfiltered++;
                    //           break;
                    //         }
                    //       } catch (_e: any) {
                    //       }
                    //       try {
                    //         if(taggingArray.data.mappings.mappings[k].extraFields != null && taggingArray.data.mappings.mappings[k].extraFields[j] != null && JSON.stringify(taggingArray.data.mappings.mappings[k].extraFields[j]).toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                    //           //console.log('showsearch true 2', taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase(), subfilter);
                    //           showSearch = true;
                    //           subfiltered++;
                    //           break;
                    //         }
                    //       } catch (_e: any) {
                    //       }
                    //     }
                    //   }
                    // }
                    // if(!showSearch) {
                    //   // check showSearch in uniq cols
                    //   for(var l = 0; l < uniqCols.length; l++) {
                    //     if(sourceArray.data.mappings.mappings[i][uniqCols[l]].replace(/ *\([^)]*\) */g, "").toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                    //       //console.log('showsearch true 3');
                    //       showSearch = true;
                    //       subfiltered++;
                    //       break;
                    //     }  
                    //   }
                    // }
                    // if(!showSearch) {
                    //   // check showSearch in source cols
                    //   for(l = 0; l < sourceCols.length; l++) {
                    //     for(var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {
                    //       if(sourceCols[l] == JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j]) {
                    //         if(sourceArray.data.mappings.mappings[i].data != null) {
                    //           if(Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j])) {
                    //             for(var k = 0; k < JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].length; k++) {
                    //               if(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j][k].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                    //                 //console.log('showsearch true 4');
                    //                 showSearch = true;
                    //                 subfiltered++;
                    //                 break;
                    //               }  
                    //             }
                    //           } else {
                    //             if(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                    //               //console.log('showsearch true 5');
                    //               showSearch = true;
                    //               subfiltered++;
                    //               break;
                    //             }
                    //           }
                    //         }
                    //       }
                    //     }
                    //   }
                    // }
                    var classBg = "";
                    if (i % 2 === 0) {
                        classBg = 'td-light';
                    }
                    else {
                        classBg = 'td-dark';
                    }
                    html += '<tr class="" id="tablerow-' + i + '">';
                    html += '<td class="left-sticky td-body ' + classBg + '" ><div class="' + (!showSearch ? 'truncate' : '') + '"><input id="cb-' + i + '" type="checkbox" class="checkbox-row cb-select"/></div></td>';
                    for (var j = 0; j < extraFields.length; j++) {
                        var k = 0;
                        for (k = 0; k < taggingArray.data.mappings.mappings.length; k++) {
                            if (taggingArray.data.mappings.mappings[k].id == sourceArray.data.mappings.mappings[i].id) {
                                break;
                            }
                        }
                        if (k < taggingArray.data.mappings.mappings.length) {
                            html += '<td part="td-body" class="' + classBg + '">';
                            html += '<div class="' + (!showSearch ? 'truncate' : '') + '">';
                            // html += '<textarea part="input" id="extra-field-'+i+'-'+j+'" class="extra-field extra-field-'+j+'" '+ (taggingArray.data.mappings.mappings[k].extraFields != null ? (taggingArray.data.mappings.mappings[k].extraFields[j] != null ?  ((taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase() == "client remarks" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : ((taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')) : "") : "") +' >'+(taggingArray.data.mappings.mappings[k].extraFields != null ? (taggingArray.data.mappings.mappings[k].extraFields[j] != null ? taggingArray.data.mappings.mappings[k].extraFields[j] : "") : "")+'</textarea>';
                            html += '<textarea part="input" id="extra-field-' + i + '-' + j + '" class="extra-field extra-field-' + j + '" ' + (extraFields != null ? (extraFields[j] != null ? ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')) : "") : "") + ' >' + (taggingArray.data.mappings.mappings[k].extraFields != null ? (taggingArray.data.mappings.mappings[k].extraFields[j] != null ? (typeof taggingArray.data.mappings.mappings[k].extraFields[j] == 'string' ? taggingArray.data.mappings.mappings[k].extraFields[j] : "") : "") : "") + '</textarea>';
                            html += '</div>';
                            html += '</td>';
                        }
                        else {
                            html += '<td part="td-body" class="' + classBg + '">';
                            html += '<div class="' + (!showSearch ? 'truncate' : '') + '">';
                            html += '<textarea part="input" id="extra-field-' + i + '-' + j + '" class="extra-field extra-field-' + j + '" type="text" value="" ' + ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '') + ' ></textarea>';
                            html += '</div>';
                            html += '</td>';
                        }
                    }
                    html += '<td class="td-body ' + classBg + '" part="td-key">';
                    html += '<div class="' + (!showSearch ? 'truncate' : '') + '">';
                    if (apiIdDropdown.length > 0) {
                        if (anotherProjection != null) {
                            html += '<sf-i-form id="tags-' + i + '" class="tags-input tags-' + i + '" name="Tags" label="Select ' + colName + '" apiId="' + apiIdDropdown + '" mode="multiselect-dropdown" searchPhrase="' + this.projectName + ((dropdownSearchPhrase != null && dropdownSearchPhrase != "") ? dropdownSearchPhrase : "") + '" selectProjection="name" selectAnotherProjection="' + anotherProjection + '" mandatory></sf-i-form>';
                        }
                        else {
                            html += '<sf-i-form id="tags-' + i + '" class="tags-input tags-' + i + '" name="Tags" label="Select ' + colName + '" apiId="' + apiIdDropdown + '" mode="multiselect-dropdown" searchPhrase="' + this.projectName + ((dropdownSearchPhrase != null && dropdownSearchPhrase != "") ? dropdownSearchPhrase : "") + '" selectProjection="name" mandatory></sf-i-form>';
                        }
                    }
                    else {
                        html += '<input id="tags-' + i + '" type="text" part="input" class="tags-input"/>';
                    }
                    html += '</div>';
                    html += '</td>';
                    // if(arrFeedbackReference != null) {
                    //   html += '<td class="td-body '+classBg+'" part="td-key">'
                    //   html += '<div class="'+(!showSearch ? 'truncate' : '')+'">';
                    //   if(arrFeedbackReference[JSON.parse(sourceArray.data.mappings.mappings[i].data)[1][0].trim()][JSON.parse(sourceArray.data.mappings.mappings[i].data)[6][0].trim().replace(/&amp;/g, "&")] == null) {
                    //     this.setError(JSON.parse(sourceArray.data.mappings.mappings[i].data)[1][0].trim() + ':' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[6][0].trim().replace(/&amp;/g, "&") + ' - is not mapped correctly');
                    //     setTimeout(() => {
                    //       this.clearMessages();
                    //     }, 20000);
                    //   } else {
                    //     html += '<sf-i-elastic-text text="'+JSON.stringify(arrFeedbackReference[JSON.parse(sourceArray.data.mappings.mappings[i].data)[1][0].trim()][JSON.parse(sourceArray.data.mappings.mappings[i].data)[6][0].trim().replace(/&amp;/g, "&")]).replace(/"/g,"").replace(/\\n/g,"").replace(/{/g,"").replace(/}/g,"").replace(/\\/g,"")+'" lineSize="4" minLength="60"></sf-i-elastic-text>';
                    //   }
                    //   html += '</div>';
                    //   html += '</td>'
                    // }
                    for (var l = 0; l < uniqCols.length; l++) {
                        console.log('uniqcolval', uniqCols[l], sourceArray.data.mappings.mappings[i], sourceArray.data.mappings.mappings[i][uniqCols[l]]);
                        html += '<td class="td-body ' + classBg + '" part="td-key">';
                        html += '<div class="' + (!showSearch ? 'truncate' : '') + '">';
                        html += '<sf-i-elastic-text text="' + sourceArray.data.mappings.mappings[i][uniqCols[l]].replace(/ *\([^)]*\) */g, "") + '" minLength="20"></sf-i-elastic-text>';
                        html += '</div>';
                        html += '</td>';
                    }
                    for (l = 0; l < sourceCols.length; l++) {
                        for (var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {
                            if (sourceCols[l] == JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j]) {
                                if (sourceArray.data.mappings.mappings[i].data != null) {
                                    html += '<td class="td-body ' + classBg + '" part="td-body">';
                                    html += '<div class="' + (!showSearch ? 'truncate' : '') + '">';
                                    if (sourceArray.data.mappings.mappings[i].id == "fdea6e4a-9d47-4042-916f-724c51f465c1") {
                                        //console.log('before before filtermatch',sourceCols[l],JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j], colCountry, (sourceArray.data.mappings.mappings[i]), (sourceArray.data.mappings.mappings[i].data), colState);
                                        //console.log('before filtermatch', colCountry, JSON.parse(sourceArray.data.mappings.mappings[i].data)[colCountry], colState, JSON.parse(sourceArray.data.mappings.mappings[i].data)[colState], JSON.parse(sourceArray.data.mappings.mappings[i].data)[colSubcategory]);
                                    }
                                    //const filterMatch = this.matchesOnBoardingFilter(JSON.parse(sourceArray.data.mappings.mappings[i].data)[colCountry][0], JSON.parse(sourceArray.data.mappings.mappings[i].data)[colState].length > 0 ? JSON.parse(sourceArray.data.mappings.mappings[i].data)[colState][0] : "", JSON.parse(sourceArray.data.mappings.mappings[i].data)[colSubcategory].length > 0 ? JSON.parse(sourceArray.data.mappings.mappings[i].data)[colSubcategory][0] : "", Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[colStatute]) ? JSON.parse(sourceArray.data.mappings.mappings[i].data)[colStatute][0] : JSON.parse(sourceArray.data.mappings.mappings[i].data)[colStatute]);
                                    const filterMatch = false;
                                    //console.log('after filtermatch', filterMatch);
                                    if (filterMatch) {
                                        if (!unfilteredDict.includes(i)) {
                                            unfilteredDict.push(i);
                                        }
                                    }
                                    //console.log('isArray', sourceCols[l], Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j]));
                                    if (Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j])) {
                                        for (var k = 0; k < JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].length; k++) {
                                            html += ('<sf-i-elastic-text text="' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[j][k] + '" minLength="60" lineSize="4"></sf-i-elastic-text>');
                                        }
                                    }
                                    else {
                                        html += ('<sf-i-elastic-text text="' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[j] + '" minLength="60" lineSize="4"></sf-i-elastic-text>');
                                    }
                                    html += '</div>';
                                    html += '</td>';
                                }
                            }
                        }
                    }
                    html += '</tr>';
                    //console.log('i=', i);
                }
                html += '</tbody>';
                html += '</table>';
            }
            divElement.innerHTML = html;
            if (unfilteredDict.length > 0) {
                var html = '';
                html += '<div class="mb-10">Items In Your Category (' + unfilteredDict.length + ")</div>";
                html += this.getFilterOnboardingString();
                divElement.querySelector('#span-filtered').innerHTML = html;
            }
            else {
                divElement.querySelector('#span-filtered').style.display = 'none';
            }
            if (subfiltered > 0) {
                divElement.querySelector('#div-subfiltered').innerHTML = '<h4 part="results-title">Filtered Results (' + subfiltered + ')</h4>';
            }
            if (this.getfilterOnboarding().length > 0) {
                for (var i = 0; i < sourceArray.data.mappings.mappings.length; i++) {
                    if (!unfilteredDict.includes(i)) {
                        const tableRow = divElement.querySelector('#tablerow-' + i);
                        if (tableRow != null) {
                            tableRow.style.display = 'none';
                        }
                    }
                }
            }
            // const inputFilter = (divElement as HTMLDivElement).querySelector('.input-filter') as HTMLInputElement;
            // inputFilter.addEventListener('keyup', (e: any) => {
            //   if(e.key == 'Enter') {
            //     //console.log('filtering...', inputFilter.value);
            //     if(this._SfLoader != null) {
            //       this._SfLoader.innerHTML = '<div class="lds-dual-ring"></div>';
            //       this._SfLoader.innerHTML += ('<div class="lds-text"><div class="lds-text-c"></div></div>');
            //     }
            //     setTimeout(() => {
            //       this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, inputFilter.value);
            //       // this._SfLoader.innerHTML = '';
            //     }, 1000);
            //   }
            // });
            (_a = divElement.querySelector('.checkbox-all')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
                divElement.querySelector('.button-save').disabled = false;
                const arrCheckBoxes = divElement.querySelectorAll('.checkbox-row');
                //console.log('cb-length', arrCheckBoxes.length);
                for (var i = 0; i < arrCheckBoxes.length; i++) {
                    const tableRow = divElement.querySelector('#tablerow-' + (i));
                    //console.log('tablerow', i, tableRow);
                    if (tableRow != null) {
                        if (tableRow.style.display != 'none') {
                            //console.log('tablerow setting', e.currentTarget.checked, (arrCheckBoxes[i] as HTMLInputElement));
                            arrCheckBoxes[i].checked = e.currentTarget.checked;
                            if (e.currentTarget.checked) {
                                if (!this.selectedCbs.includes(i + '')) {
                                    this.selectedCbs.push(i + '');
                                }
                            }
                            else {
                                this.selectedCbs = [];
                            }
                        }
                    }
                }
                //console.log('checkedarr', this.selectedCbs);
            });
            for (var j = 0; j < extraFields.length; j++) {
                const inputArrJ = divElement.querySelectorAll('.extra-field-' + j);
                for (var k = 0; k < inputArrJ.length; k++) {
                    inputArrJ[k].addEventListener('keyup', (e) => {
                        divElement.querySelector('.button-save').disabled = false;
                        if (e.key == "Enter") {
                            this.applyAndReloadTagging(e, colName, taggingArray, sourceArray, divElement);
                            const activeIndex = e.target.id.split('-')[2];
                            for (var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {
                                taggingArray.data.mappings.mappings[count].extraFields = [];
                                if (this.selectedCbs.length > 0 && this.selectedCbs.includes(count + "")) {
                                    for (var l = 0; l < extraFields.length; l++) {
                                        const inputExtraField = divElement.querySelector('#extra-field-' + activeIndex + '-' + l);
                                        taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value);
                                    }
                                }
                                else {
                                    for (var l = 0; l < extraFields.length; l++) {
                                        const inputExtraField = divElement.querySelector('#extra-field-' + count + '-' + l);
                                        taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value);
                                    }
                                }
                            }
                            this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols, apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, subfilter);
                        }
                        // this.saveTagging(taggingArray.data.mappings, uploadFunction, refreshFunction, true);
                    });
                    inputArrJ[k].addEventListener('focusout', (e) => {
                        this.applyAndReloadTagging(e, colName, taggingArray, sourceArray, divElement);
                        const activeIndex = e.target.id.split('-')[2];
                        for (var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {
                            taggingArray.data.mappings.mappings[count].extraFields = [];
                            if (this.selectedCbs.length > 0 && this.selectedCbs.includes(count + "")) {
                                for (var l = 0; l < extraFields.length; l++) {
                                    const inputExtraField = divElement.querySelector('#extra-field-' + activeIndex + '-' + l);
                                    taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value);
                                }
                            }
                            else {
                                for (var l = 0; l < extraFields.length; l++) {
                                    const inputExtraField = divElement.querySelector('#extra-field-' + count + '-' + l);
                                    taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value);
                                }
                            }
                        }
                        this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols, apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, subfilter);
                    });
                }
            }
            const multiArr = divElement.querySelectorAll('.tags-input');
            for (var i = 0; i < multiArr.length; i++) {
                if (apiIdDropdown.length > 0) {
                    for (var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {
                        var equal = true;
                        for (var k = 0; k < uniqCols.length; k++) {
                            if (sourceArray.data.mappings.mappings[i] != null && taggingArray.data.mappings.mappings[j] != null) {
                                if (sourceArray.data.mappings.mappings[i][uniqCols[k]] != taggingArray.data.mappings.mappings[j][uniqCols[k]]) {
                                    equal = false;
                                }
                            }
                        }
                        if (taggingArray.data.mappings.mappings[j].id == "fdea6e4a-9d47-4042-916f-724c51f465c1" && equal) {
                            //console.log('rendertagging', taggingArray.data.mappings.mappings[j], sourceArray.data.mappings.mappings[i]);
                        }
                        if (equal) {
                            multiArr[i].preselectedValues = JSON.stringify(taggingArray.data.mappings.mappings[j][colName]);
                            if (taggingArray.data.mappings.mappings[j][colName].length > 0) {
                                multiArr[i].parentElement.setAttribute("part", "row-mapped");
                            }
                        }
                    }
                    // for(var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {
                    //   var equal = true;
                    //   for(var k = 0; k < uniqCols.length; k++) {
                    //     if(sourceArray.data.mappings.mappings[i] != null && taggingArray.data.mappings.mappings[j] != null) {
                    //       if(sourceArray.data.mappings.mappings[i][uniqCols[k]] != taggingArray.data.mappings.mappings[j][uniqCols[k]]) {
                    //         equal = false;
                    //       }
                    //     }
                    //   }
                    //   if(taggingArray.data.mappings.mappings[i].id == "fdea6e4a-9d47-4042-916f-724c51f465c1") {
                    //     //console.log('rendertagging', taggingArray.data.mappings.mappings[i], sourceArray.data.mappings.mappings[i]);
                    //   }
                    //   if(equal) {
                    //     (multiArr[i] as SfIForm).preselectedValues = JSON.stringify(taggingArray.data.mappings.mappings[j][colName]);
                    //     if(taggingArray.data.mappings.mappings[j][colName].length > 0) {
                    //       ((multiArr[i] as SfIForm).parentElement as HTMLTableCellElement).setAttribute("part", "row-mapped");
                    //     }
                    //   }
                    // }
                    //console.log('preselect', multiArr[i]);
                    multiArr[i].addEventListener('valueChanged', async (e) => {
                        divElement.querySelector('.button-save').disabled = false;
                        this.applyAndReloadTagging(e, colName, taggingArray, sourceArray, divElement);
                        // this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, arrFeedbackReference, proposedUsersLabel, subfilter); 
                    });
                }
                else {
                    if (taggingArray.data.mappings.mappings[i] != null) {
                        multiArr[i].value = taggingArray.data.mappings.mappings[i][colName];
                    }
                    multiArr[i].addEventListener('keyup', async (e) => {
                        if (e.key == "Enter") {
                            divElement.querySelector('.button-save').disabled = false;
                            this.applyAndReloadTagging(e, colName, taggingArray, sourceArray, divElement);
                            // this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, arrFeedbackReference, proposedUsersLabel, subfilter)
                        }
                    });
                }
            }
            const buttonApply = divElement.querySelector('.button-apply');
            buttonApply.addEventListener('click', () => {
                console.log('applied');
                // this.applyAndReloadTagging(e,colName, taggingArray, sourceArray, divElement);
                this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols, apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, subfilter);
            });
            const buttonToggleMoreBack = divElement.querySelector('.button-toggle-more-back');
            const buttonToggleMore = divElement.querySelector('.button-toggle-more');
            buttonToggleMore.addEventListener('click', async (ev) => {
                ev.target.classList.add('hide');
                buttonToggleMoreBack.classList.remove('hide');
                const buttonDownloadBackups = divElement.querySelector('.button-download-backups');
                buttonDownloadBackups.style.display = 'flex';
                const buttonDownloadBackupsNew = Util.clearListeners(buttonDownloadBackups);
                buttonDownloadBackupsNew.addEventListener('click', async () => {
                    const result = await this.fetchGetStoredMapping(colName);
                    for (var i = 0; i < result.data.length; i++) {
                        const blob = new Blob([result.data[i].mappings != null ? JSON.stringify(result.data[i].mappings) : JSON.stringify(result.data[i])], { type: 'text/html' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.setAttribute('href', url);
                        a.setAttribute('download', 'report_' + colName + '_' + i + '.json');
                        a.click();
                    }
                    buttonToggleMoreBack.click();
                    if (result.data.length === 0) {
                        this.setError("No backups found!");
                        setTimeout(() => {
                            this.clearMessages();
                        }, 3000);
                    }
                });
                const buttonExportMapping = divElement.querySelector('.button-export-mapping');
                buttonExportMapping.style.display = 'flex';
                //console.log('buttonExportMapping', buttonExportMapping);
                const buttonExportMappingNew = Util.clearListeners(buttonExportMapping);
                buttonExportMappingNew.addEventListener('click', async () => {
                    let valueStr = [];
                    for (var i = 0; i < multiArr.length; i++) {
                        if (apiIdDropdown.length > 0) {
                            for (var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {
                                var equal = true;
                                for (var k = 0; k < uniqCols.length; k++) {
                                    if (sourceArray.data.mappings.mappings[i] != null && taggingArray.data.mappings.mappings[j] != null) {
                                        if (sourceArray.data.mappings.mappings[i][uniqCols[k]] != taggingArray.data.mappings.mappings[j][uniqCols[k]]) {
                                            equal = false;
                                        }
                                    }
                                }
                                if (equal) {
                                    valueStr.push(JSON.stringify(taggingArray.data.mappings.mappings[j][colName]));
                                }
                            }
                        }
                        else {
                            if (taggingArray.data.mappings.mappings[i] != null) {
                                valueStr.push(taggingArray.data.mappings.mappings[i][colName]);
                            }
                            else {
                                valueStr.push('');
                            }
                        }
                    }
                    //console.log('valueStr', valueStr);
                    const valuesHTML = JSON.stringify(valueStr);
                    const outerHTML = '<h3>This extract is generated on ' + new Date() + '</h3>' + divElement.querySelector('#span-filtered').outerHTML + '<br /><h2>' + divElement.querySelector('#mapped-stats-title').outerHTML + '</h2>' + divElement.querySelector('#table-data').outerHTML;
                    let tableHTML = this.TAGGING_HTML.replace(/TABLE_DATA/g, outerHTML);
                    tableHTML = tableHTML.replace(/TABLE_VALUES/g, valuesHTML);
                    const blob = new Blob([tableHTML], { type: 'text/html' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'mapping_' + colName + '_' + new Date().getTime() + '.html');
                    a.click();
                });
            });
            buttonToggleMoreBack.addEventListener('click', async (ev) => {
                ev.target.classList.add('hide');
                buttonToggleMore.classList.remove('hide');
                const buttonDownloadBackups = divElement.querySelector('.button-download-backups');
                buttonDownloadBackups.style.display = 'none';
            });
            const buttonSave = divElement.querySelector('.button-save');
            buttonSave === null || buttonSave === void 0 ? void 0 : buttonSave.addEventListener('click', async () => {
                await this.saveTagging(taggingArray.data.mappings, uploadFunction, refreshFunction, false);
            });
            const buttonCancel = divElement.querySelector('.button-cancel');
            buttonCancel === null || buttonCancel === void 0 ? void 0 : buttonCancel.addEventListener('click', async () => {
                //console.log('cancel clicked');
                await this.fetchCancelOnboardingJob(colName);
                refreshFunction();
            });
            const cbArr = divElement.querySelectorAll('.cb-select');
            for (i = 0; i < cbArr.length; i++) {
                cbArr[i].addEventListener('change', (ev) => {
                    const cbSelectId = ev.currentTarget.id;
                    const cbSelectIndex = cbSelectId.split('-')[1];
                    if (!this.selectedCbs.includes(cbSelectIndex)) {
                        this.selectedCbs.push(cbSelectIndex);
                    }
                    else {
                        this.selectedCbs.splice(this.selectedCbs.indexOf(cbSelectIndex), 1);
                    }
                    //console.log(this.selectedCbs);
                });
            }
            // const arrExtraFields = (divElement as HTMLDivElement).querySelectorAll('.extra-field') as NodeListOf<HTMLInputElement>;
            // var totalFields = 0;
            // var filledFields = 0;
            // for(var i = 0; i < arrExtraFields.length; i++) {
            //   const extraField = arrExtraFields[i] as HTMLInputElement;
            //   if(extraField.parentElement?.parentElement?.style.display != "none") {
            //     if(extraField.value != "") {
            //       filledFields++;
            //     }
            //     totalFields++;
            //   }
            // }
            if (divElement.querySelector("#span-extra-filled") != null) {
                //(divElement as HTMLDivElement).querySelector("#span-extra-filled")!.innerHTML = "Fields: " + filledFields + "/" + totalFields + " completed";
                //console.log('Total fields = ' + totalFields + ', filled fields = ' + filledFields);
            }
        };
        this.renderMappingTable = (divElement, jsonData, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction, extraFields, uploadBlock, extraFieldPosition, colName, subfilter, statuteColName, extraHintsArr) => {
            var _a, _b, _c, _f;
            console.log('cols', jsonData[0].data.cols);
            //console.log('divelement', divElement);
            //console.log('jsonData', jsonData);
            //console.log('cursor', cursor);
            //console.log('fetch', fetchFunction);
            //console.log('searchstring', searchString);
            //console.log('subfiltervalue', subfilter);
            const arrCompliancesFrequencies = {};
            if (jsonData.length === 0)
                return;
            this.selectedCbs = [];
            let colCountry = -1;
            let colState = -1;
            let colSubcategory = -1;
            let colStatute = -1;
            const unfilteredDict = [];
            var html = '';
            html += '<div>';
            html += '<h3 part="results-title">Total Items (' + found + ')</h3>';
            html += '<h4 id="span-filtered" part="results-title"></h4>';
            html += '<h4 id="span-extra-filled" part="results-title"></h4>';
            html += '</div>';
            html += '<div class="d-flex justify-between align-center left-sticky flex-wrap mb-20">';
            html += '<div id="div-subfiltered"></div>';
            html += '<div id="scroll-overlay" part="onboarding-scroll-overlay" class="pos-fixed-scroll justify-center align-center">';
            html += '<div id="scroll-overlay-left" class="mr-10"><button part="button-icon"><span class="material-symbols-outlined">arrow_left_alt</span></button></div>';
            html += '<div id="scroll-overlay-right" class="ml-10"><button part="button-icon"><span class="material-symbols-outlined">arrow_right_alt</span></button></div>';
            html += '</div>';
            html += '<div id="detail-overlay" part="onboarding-detail-overlay" class="pos-fixed justify-center align-center hide">';
            html += '<div class="cover-slide"></div>';
            html += '<div class="detail-container p-10">';
            html += '<div class="d-flex justify-between align-center mb-20">';
            html += '<div part="results-title">Row Details</div>';
            html += '<button part="button-icon" class="detail-close"><span class="material-symbols-outlined">close</span></button>';
            html += '</div>';
            html += '<div id="detail-overlay-list">';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="d-flex align-center">';
            html += '<input part="input" type="text" placeholder="Filter" class="input-filter mr-10" value="' + subfilter + '" />';
            html += '<div class="mr-10">';
            html += '<div class="d-flex justify-end"><button part="calendar-tab-icon-not-selected" class="material-icons button-toggle-more">expand_more</button><button part="calendar-tab-icon-selected" class="material-icons button-toggle-more-back hide">expand_less</button></div>';
            html += '<div style="position: absolute; margin-top: 5px;"><button part="button" class="hide d-flex align-center button-download-backups" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">file_save</span><span>Download Backups</span></button><button part="button" class="mt-10 hide d-flex align-center button-export-mapping" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">export_notes</span><span>Export Mapping</span></button></div>';
            html += '</div>';
            html += (this.disablesave == "yes" ? '' : '<button part="button" class="button-save" disabled>Save</button>');
            html += '</div>';
            html += '</div>';
            html += '<table id="table-data">';
            html += '<thead>';
            html += '<th part="td-head" class="td-head">';
            // html += 'Select';
            html += '<div id="select-all"><input class="checkbox checkbox-all" part="input-checkbox" type="checkbox" ' + ((this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '') + '/></div>';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += '<div>View</div>';
            html += '</th>';
            if (extraFieldPosition === 0) {
                for (var i = 0; i < extraFields.length; i++) {
                    html += '<th part="td-head" class="td-head">';
                    html += extraFields[i];
                    html += '</th>';
                }
            }
            if (colName.toLowerCase() == "compliances") {
                html += '<th part="td-head" class="td-head">';
                html += 'Proposed Users';
                html += '</th>';
            }
            html += '<th part="td-head" class="td-head">';
            html += 'Id';
            html += '</th>';
            // for(var j = 0; j < JSON.parse(jsonData[0].data.cols).length; j++) {
            //   if(jsonData[0].cols.includes(JSON.parse(jsonData[0].data.cols)[j])) {
            //     html += '<th part="td-head" class="td-head ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[0].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '">'
            //     html += JSON.parse(jsonData[0].data.cols)[j]
            //     html += '</th>'
            //   }
            // }
            for (var j = 0; j < jsonData[0].cols.length; j++) {
                html += '<th part="td-head" class="td-head ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[0].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '">';
                html += jsonData[0].cols[j];
                html += '</th>';
            }
            if (extraFieldPosition === 1) {
                for (var i = 0; i < extraFields.length; i++) {
                    html += '<th part="td-head" class="td-head">';
                    html += extraFields[i];
                    html += '</th>';
                }
            }
            html += '</thead>';
            //console.log('colstate',  JSON.parse(jsonData[0].data.cols));
            for (var i = 0; i < JSON.parse(jsonData[0].data.cols).length; i++) {
                if (JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == "country") {
                    //console.log('colstate country', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
                    colCountry = i;
                }
                if (JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == "state") {
                    //console.log('colstate state', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
                    colState = i;
                }
                if (JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == "subcategory") {
                    //console.log('colstate subcategory', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
                    colSubcategory = i;
                }
                if (JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == statuteColName) {
                    //console.log('colstate statute', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
                    colStatute = i;
                }
            }
            //var countExtra0 = 0;
            var countextra = [];
            var subfiltered = 0;
            html += '<tbody>';
            for (let level = 0; level < 2; level++) {
                for (var i = 0; i < jsonData.length; i++) {
                    //console.log('subfilter value before', subfiltered);
                    if (JSON.parse(jsonData[i].data.data)[colCountry].length === 0 && level === 1) {
                        html += '<tr id="tablerow-' + i + '" class="tablerow" style="display: none">';
                        html += '<td part="td-action">';
                        html += '<div id="select-' + i + '"><input class="checkbox checkbox-' + i + ' checkbox-row" part="input-checkbox" type="checkbox"/></div>';
                        html += '</td>';
                        html += '<td part="td-action">';
                        html += '<div><button part="button" id="show-detail-' + i + '"><span class="material-symbols-outlined">open_in_new</span></button></div>';
                        html += '</td>';
                        for (var j = 0; j < extraFields.length; j++) {
                            html += '<td part="td-body">';
                            html += '<sf-i-multitextarea id="extra-field-' + jsonData[i].id + '-' + j + '" class="extra-field-' + j + ' extra-field" fields="[]" values="" hint="" showFields="15"></sf-i-multitextarea>';
                            html += '</td>';
                            if (j === 0) {
                                //countExtra0++;
                                countextra.push(i);
                            }
                        }
                        if (colName.toLowerCase() == "compliances") {
                            html += '<td part="td-body">';
                            html += JSON.stringify(jsonData[i].previousExtraFields);
                            html += '</td>';
                        }
                        html += '<td part="td-body">';
                        html += '<sf-i-elastic-text class="statute id-' + i + '" text="' + (jsonData[i].id) + '" minLength="10"></sf-i-elastic-text>';
                        html += '</td>';
                        html += '</tr>';
                        continue;
                    }
                    var showSearch = false;
                    if (subfilter == "") {
                        showSearch = true;
                    }
                    else {
                        for (var j = 0; j < extraFields.length; j++) {
                            try {
                                if (jsonData[i].extraFields != null && jsonData[i].extraFields[j] != null && jsonData[i].extraFields[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                                    showSearch = true;
                                    subfiltered++;
                                    break;
                                }
                            }
                            catch (e) {
                            }
                            try {
                                if (jsonData[i].extraFields != null && jsonData[i].extraFields[j] != null && JSON.stringify(jsonData[i].extraFields[j]).toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                                    showSearch = true;
                                    subfiltered++;
                                    break;
                                }
                            }
                            catch (e) {
                            }
                        }
                        if (!showSearch) {
                            for (var j = 0; j < JSON.parse(jsonData[i].data.cols).length; j++) {
                                if (jsonData[i].cols.includes(JSON.parse(jsonData[i].data.cols)[j])) {
                                    if (Array.isArray(JSON.parse(jsonData[i].data.data)[j])) {
                                        var tempCount = subfiltered;
                                        for (var k = 0; k < JSON.parse(jsonData[i].data.data)[j].length; k++) {
                                            if (JSON.parse(jsonData[i].data.data)[j][k].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                                                showSearch = true;
                                                //console.log('subfilter value inside 1', subfiltered);
                                                subfiltered++;
                                                break;
                                            }
                                        }
                                        if (subfiltered > tempCount)
                                            break;
                                    }
                                    else {
                                        if (JSON.parse(jsonData[i].data.data)[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                                            showSearch = true;
                                            //console.log('subfilter value inside 2', subfiltered);
                                            subfiltered++;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //console.log('subfilter value', subfiltered);
                    var classBg = "";
                    if (i % 2 === 0) {
                        classBg = 'td-light';
                    }
                    else {
                        classBg = 'td-dark';
                    }
                    var mapped = "";
                    if (jsonData[i].mapped) {
                        mapped = "checked";
                        this.selectedCbs.push(i);
                    }
                    if ((level == 0 && jsonData[i].mapped) || (level == 1 && !jsonData[i].mapped)) {
                        if (arrCompliancesFrequencies[jsonData[i].id] == null) {
                            arrCompliancesFrequencies[jsonData[i].id] = 0;
                        }
                        else {
                            arrCompliancesFrequencies[jsonData[i].id]++;
                        }
                        html += '<tr id="tablerow-' + i + '" class="tablerow">';
                        html += '<td part="td-action" class="' + (jsonData[i].mapped ? 'chosen' : '') + '">';
                        html += '<div id="select-' + i + '" class="' + (!showSearch ? 'truncate' : '') + '"><input class="checkbox checkbox-' + i + ' checkbox-row" part="input-checkbox" type="checkbox" ' + mapped + ' ' + ((this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '') + '/></div>';
                        html += '</td>';
                        html += '<td part="td-action" class="' + (jsonData[i].mapped ? 'chosen' : '') + '">';
                        html += '<div class="' + (!showSearch ? 'truncate' : '') + '"><button class="button-expand" part="button-icon" id="show-detail-' + i + '"><span class="material-symbols-outlined">open_in_new</span></button></div>';
                        let locationsForThisItem = [];
                        if (JSON.parse(jsonData[i].data.data)[colState].length > 0) {
                            locationsForThisItem = this.getLocationsByState(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colState][0], JSON.parse(jsonData[i].data.data)[colStatute]);
                        }
                        else {
                            //console.log(JSON.parse(jsonData[i].data.data)[colStatute]);
                            locationsForThisItem = this.getLocationsByCountry(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colStatute]);
                        }
                        if (extraFieldPosition === 0) {
                            for (var j = 0; j < extraFields.length; j++) {
                                html += '<td part="td-body" class="' + classBg + ' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
                                const strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g, '&quot;');
                                const valuesForThisItem = (jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "");
                                let strValuesForThisItem = "";
                                strValuesForThisItem = JSON.stringify(valuesForThisItem).replace(/"/g, '&quot;');
                                html += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-multitextarea id="extra-field-' + jsonData[i].id + '-' + j + '" class="extra-field-' + j + ' extra-field" ' + (mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : ''))) + ' fields="' + strLocationsForThisItem + '" values="' + strValuesForThisItem + '" hint="' + extraHintsArr[j] + '" showFields="15"></sf-i-multitextarea></div>';
                                // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'">'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</sf-i-multitextarea></div>';
                                // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><textarea part="input" id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')))+' >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</textarea></div>';
                                html += '</td>';
                            }
                            /*
                            for(var j = 0; j < extraFields.length; j++) {
                              
                              html += '<td part="td-body" class="'+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
                
                              let locationsForThisItem: any = '';
                
                              if(JSON.parse(jsonData[i].data.data)[colState].length > 0) {
                                locationsForThisItem = this.getLocationsByState(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colState][0], JSON.parse(jsonData[i].data.data)[colStatute][0]);
                              } else {
                                locationsForThisItem = this.getLocationsByCountry(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colStatute][0]);
                              }
                
                              const strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
                              const valuesForThisItem = (jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "");
                              let strValuesForThisItem: string = "";
                              strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
                              // try {
                              //   JSON.parse(valuesForThisItem);
                              //   strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
                              //   //console.log('locationsForThisItem 1', JSON.stringify(locationsForThisItem), strValuesForThisItem);
                              // } catch (e: any) {
                              //   strValuesForThisItem = "";
                              // }
                              //console.log('locationsForThisItem', JSON.stringify(locationsForThisItem));
                
                              html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'" ></sf-i-multitextarea></div>';
                
                              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'" >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</sf-i-multitextarea></div>';
                
                              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><textarea part="input" id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')))+' >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</textarea></div>';
                              html += '</td>';
                              if(j === 0) {
                                countExtra0++;
                              }
                            }
                            */
                        }
                        if (colName.toLowerCase() == "compliances") {
                            var userHtml = '';
                            userHtml = this.getPreviousExtraFields(i, jsonData[i].previousExtraFields, locationsForThisItem, showSearch);
                            html += '<td part="td-body" class="' + classBg + ' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
                            html += userHtml;
                            html += '</td>';
                        }
                        html += '<td part="td-body" class="' + classBg + ' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
                        html += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-elastic-text class="statute id-' + i + '" text="' + (jsonData[i].id) + '" minLength="10"></sf-i-elastic-text></div>';
                        html += '</td>';
                        //let data = JSON.parse(jsonData[i].fields.data);
                        for (var j = 0; j < JSON.parse(jsonData[i].data.cols).length; j++) {
                            if (jsonData[i].cols.includes(JSON.parse(jsonData[i].data.cols)[j])) {
                                html += '<td part="td-body" class="td-body ' + classBg + ' ' + (jsonData[i].mapped ? 'chosen' : '') + ' ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[i].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '">';
                                html += '<div class="' + (!showSearch ? 'truncate' : '') + '">';
                                html += '<div class="d-flex align-center">';
                                const filterMatch = this.matchesOnBoardingFilter(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colState].length > 0 ? JSON.parse(jsonData[i].data.data)[colState][0] : "", JSON.parse(jsonData[i].data.data)[colSubcategory].length > 0 ? JSON.parse(jsonData[i].data.data)[colSubcategory][0] : "", Array.isArray(JSON.parse(jsonData[i].data.data)[colStatute]) ? JSON.parse(jsonData[i].data.data)[colStatute][0] : JSON.parse(jsonData[i].data.data)[colStatute]);
                                if (jsonData[i].id == "f724e2b9-451a-49ec-85ba-2b099f433c73") {
                                    console.log('filtermatch', filterMatch);
                                }
                                if (filterMatch) {
                                    if (!unfilteredDict.includes(i)) {
                                        unfilteredDict.push(i);
                                    }
                                }
                                if (JSON.parse(jsonData[i].data.cols)[j] == "statute") {
                                    html += '<span class="material-symbols-outlined pr-5 plain-filter-icon">filter_list</span>';
                                }
                                if (Array.isArray(JSON.parse(jsonData[i].data.data)[j])) {
                                    for (var k = 0; k < JSON.parse(jsonData[i].data.data)[j].length; k++) {
                                        html += ('<sf-i-elastic-text text="' + JSON.parse(jsonData[i].data.data)[j][k] + '" minLength="80" lineSize="4"></sf-i-elastic-text>');
                                        //console.log('Considering', JSON.parse(jsonData[i].data.cols)[j], jsonData[i].cols, j, JSON.parse(jsonData[i].data.data)[j], '<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j][k]+'" minLength="80"></sf-i-elastic-text>');
                                    }
                                }
                                else {
                                    html += ('<sf-i-elastic-text text="' + JSON.parse(jsonData[i].data.data)[j] + '" minLength="80" lineSize="4"></sf-i-elastic-text>');
                                    //console.log('Considering', JSON.parse(jsonData[i].data.cols)[j], jsonData[i].cols, j, JSON.parse(jsonData[i].data.data)[j], '<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j]+'" minLength="80"></sf-i-elastic-text>');
                                }
                                html += '</div>';
                                html += '</div>';
                                html += '</td>';
                            }
                        }
                        for (var k = 0; k < jsonData[i].cols.length; k++) {
                            if (JSON.parse(jsonData[i].data.cols).includes(jsonData[i].cols[k])) {
                            }
                            else {
                                html += '<td part="td-body" class="td-body ' + classBg + ' ' + (jsonData[i].mapped ? 'chosen' : '') + ' ' + '"></td>';
                            }
                        }
                        // else {
                        //   var foundCol = false;
                        //   for(var k = 0; k < jsonData[i].cols.length; k++) {
                        //     console.log('founcol compare', jsonData[i].cols[k], JSON.parse(jsonData[i].data.cols)[j]);
                        //     if(jsonData[i].cols[k] == JSON.parse(jsonData[i].data.cols)[j]) {
                        //       if(JSON.parse(jsonData[i].data.cols).includes(jsonData[i].cols[k])) {
                        //         foundCol = true;
                        //       }
                        //     } 
                        //     console.log('founcol compare', foundCol);
                        //   }
                        //   if(!foundCol) {
                        //     html += '<td part="td-body" class="td-body '+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + ' ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[i].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '"></td>';
                        //   }
                        // }
                        if (extraFieldPosition === 1) {
                            for (var j = 0; j < extraFields.length; j++) {
                                html += '<td part="td-body" class="' + classBg + ' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
                                let locationsForThisItem = [];
                                if (JSON.parse(jsonData[i].data.data)[colState].length > 0) {
                                    locationsForThisItem = this.getLocationsByState(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colState][0], JSON.parse(jsonData[i].data.data)[colStatute]);
                                }
                                else {
                                    //console.log(JSON.parse(jsonData[i].data.data)[colStatute]);
                                    locationsForThisItem = this.getLocationsByCountry(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colStatute]);
                                }
                                const strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g, '&quot;');
                                const valuesForThisItem = (jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "");
                                let strValuesForThisItem = "";
                                strValuesForThisItem = JSON.stringify(valuesForThisItem).replace(/"/g, '&quot;');
                                html += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-multitextarea id="extra-field-' + jsonData[i].id + '-' + j + '" class="extra-field-' + j + ' extra-field" ' + (mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : ''))) + ' fields="' + strLocationsForThisItem + '" values="' + strValuesForThisItem + '" hint="' + extraHintsArr[j] + '" showFields="15"></sf-i-multitextarea></div>';
                                // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'">'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</sf-i-multitextarea></div>';
                                // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><textarea part="input" id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')))+' >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</textarea></div>';
                                html += '</td>';
                            }
                        }
                        html += '</tr>';
                    }
                }
            }
            html += '</tbody>';
            html += '</table>';
            //console.log('countextra', countExtra0, countextra);
            console.log('arrCompliancesFrequencies', arrCompliancesFrequencies);
            divElement.innerHTML = html;
            if (unfilteredDict.length > 0) {
                var html = '';
                html += '<div class="mb-10">Items In Your Category (' + unfilteredDict.length + ")</div>";
                html += this.getFilterOnboardingString();
                divElement.querySelector('#span-filtered').innerHTML = html;
            }
            else {
                divElement.querySelector('#span-filtered').style.display = 'none';
            }
            if (subfiltered > 0) {
                divElement.querySelector('#div-subfiltered').innerHTML = '<h5 part="results-title">Filtered Results (' + subfiltered + ')</h5>';
            }
            if (this.getfilterOnboarding().length > 0) {
                for (var i = 0; i < jsonData.length; i++) {
                    if (!unfilteredDict.includes(i)) {
                        const tableRow = divElement.querySelector('#tablerow-' + i);
                        if (tableRow != null) {
                            tableRow.style.display = 'none';
                        }
                    }
                }
            }
            // Scroll arrow handlers
            const scrollLeft = divElement.querySelector('#scroll-overlay-left');
            scrollLeft.addEventListener('click', () => {
                //console.log('left');
                this._SfOnboardingStatutesListContainer.scrollLeft -= 150;
            });
            const scrollRight = divElement.querySelector('#scroll-overlay-right');
            scrollRight.addEventListener('click', () => {
                //console.log('right');
                //var scrollLeft = ((divElement as HTMLDivElement).querySelector('#statutes-list-container') as HTMLDivElement).scrollLeft;
                //((divElement as HTMLDivElement).querySelector('#statutes-list-container') as HTMLDivElement).scrollLeft += 100;
                this._SfOnboardingStatutesListContainer.scrollLeft += 150;
            });
            // Extra field handlers
            for (var i = 0; i < extraFields.length; i++) {
                const arrExtraFields = divElement.querySelectorAll('.extra-field-' + i);
                for (var j = 0; j < arrExtraFields.length; j++) {
                    const extraField = divElement.querySelector('#extra-field-' + jsonData[j].id + '-' + i);
                    extraField === null || extraField === void 0 ? void 0 : extraField.addEventListener('focusout', () => {
                        divElement.querySelector('.button-save').disabled = false;
                    });
                    extraField === null || extraField === void 0 ? void 0 : extraField.addEventListener('keyup', async (_e) => {
                        if (extraFieldPosition === 1) {
                            await this.saveMapping(divElement, uploadBlock, jsonData, extraFields, searchString, uploadFunction, refreshFunction, true);
                        }
                    });
                }
            }
            // Filter field handlers
            const inputFilter = divElement.querySelector('.input-filter');
            inputFilter.addEventListener('keyup', (e) => {
                if (e.key == 'Enter') {
                    //console.log(inputFilter.value);
                    if (this._SfLoader != null) {
                        this._SfLoader.innerHTML = '<div class="lds-dual-ring"></div>';
                        this._SfLoader.innerHTML += ('<div class="lds-text"><div class="lds-text-c"></div></div>');
                    }
                    setTimeout(() => {
                        this.renderMappingTable(divElement, jsonData, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction, extraFields, uploadBlock, extraFieldPosition, colName, inputFilter.value, statuteColName, extraHintsArr);
                        this._SfLoader.innerHTML = '';
                    }, 1000);
                }
            });
            // More button handlers
            const buttonToggleMoreBack = divElement.querySelector('.button-toggle-more-back');
            const buttonToggleMore = divElement.querySelector('.button-toggle-more');
            buttonToggleMore.addEventListener('click', async (ev) => {
                ev.target.classList.add('hide');
                buttonToggleMoreBack.classList.remove('hide');
                const buttonDownloadBackups = divElement.querySelector('.button-download-backups');
                buttonDownloadBackups.style.display = 'flex';
                const buttonDownloadBackupsNew = Util.clearListeners(buttonDownloadBackups);
                buttonDownloadBackupsNew.addEventListener('click', async () => {
                    const result = await this.fetchGetStoredMapping(colName);
                    for (var i = 0; i < result.data.length; i++) {
                        const blob = new Blob([result.data[i].mappings != null ? JSON.stringify(result.data[i].mappings) : JSON.stringify(result.data[i])], { type: 'text/html' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.setAttribute('href', url);
                        a.setAttribute('download', 'report_' + colName + '_' + i + '.json');
                        a.click();
                    }
                    buttonToggleMoreBack.click();
                    if (result.data.length === 0) {
                        this.setError("No backups found!");
                        setTimeout(() => {
                            this.clearMessages();
                        }, 3000);
                    }
                });
                const buttonExportMapping = divElement.querySelector('.button-export-mapping');
                buttonExportMapping.style.display = 'flex';
                //console.log('buttonExportMapping', buttonExportMapping);
                const buttonExportMappingNew = Util.clearListeners(buttonExportMapping);
                buttonExportMappingNew.addEventListener('click', async () => {
                    const outerHTML = '<h3>This extract is generated on ' + new Date() + '</h3>' + divElement.querySelector('#span-filtered').outerHTML + '<br /><h4><span class="chosen" style="border: solid 1px black;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;Mapped compliances</h4><h4><span style="border: solid 1px black;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;Un-mapped compliances</h4>' + divElement.querySelector('#table-data').outerHTML;
                    const tableHTML = this.MAPPING_HTML.replace(/TABLE_DATA/g, outerHTML);
                    const blob = new Blob([tableHTML], { type: 'text/html' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'mapping_' + colName + '_' + new Date().getTime() + '.html');
                    a.click();
                });
            });
            buttonToggleMoreBack.addEventListener('click', async (ev) => {
                ev.target.classList.add('hide');
                buttonToggleMore.classList.remove('hide');
                const buttonDownloadBackups = divElement.querySelector('.button-download-backups');
                buttonDownloadBackups.style.display = 'none';
                const buttonExportMapping = divElement.querySelector('.button-export-mapping');
                buttonExportMapping.style.display = 'none';
            });
            // Statute filters
            const arrFilterPlain = divElement.querySelectorAll('.plain-filter-icon');
            for (var i = 0; i < arrFilterPlain.length; i++) {
                arrFilterPlain[i].addEventListener('click', (e) => {
                    const value = e.currentTarget.nextSibling.text;
                    divElement.querySelector('.input-filter').value = value;
                    const event = new KeyboardEvent('keyup', {
                        key: 'Enter',
                        code: 'Enter',
                        which: 13,
                        keyCode: 13,
                    });
                    divElement.querySelector('.input-filter').dispatchEvent(event);
                    //console.log('filter click');
                });
            }
            // Expand handlers
            const arrExpands = divElement.querySelectorAll('.button-expand');
            for (var i = 0; i < arrExpands.length; i++) {
                arrExpands[i].addEventListener('click', (e) => {
                    var _a;
                    (_a = divElement.querySelector('#detail-overlay')) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
                    const id = e.currentTarget.id;
                    const index = id.split("-")[2];
                    //console.log(id, index);
                    var html = '';
                    html += '<div class="d-flex flex-wrap">';
                    for (var j = 0; j < JSON.parse(jsonData[0].data.cols).length; j++) {
                        html += '<div class="p-10">';
                        html += ('<div part="td-head">' + JSON.parse(jsonData[0].data.cols)[j] + '</div>');
                        if (JSON.parse(jsonData[0].data.cols)[j] == "state") {
                            //console.log('state value', JSON.parse(jsonData[index].data.data)[j]);
                        }
                        if (Array.isArray(JSON.parse(jsonData[index].data.data)[j])) {
                            html += '<div part="td-body">';
                            if (JSON.parse(jsonData[index].data.data)[j].length === 0) {
                                html += ('-<br />');
                            }
                            else {
                                for (var k = 0; k < JSON.parse(jsonData[index].data.data)[j].length; k++) {
                                    var val = JSON.parse(jsonData[index].data.data)[j][k];
                                    if (val == '') {
                                        val = '-';
                                    }
                                    html += ('<sf-i-elastic-text text="' + val + '" minLength="80"></sf-i-elastic-text>');
                                }
                            }
                            html += '</div>';
                        }
                        else {
                            var val = JSON.parse(jsonData[index].data.data)[j];
                            if (val == '') {
                                val = '-';
                            }
                            html += ('<div part="td-body">' + '<sf-i-elastic-text text="' + val + '" minLength="80"></sf-i-elastic-text>' + '</div><br />');
                        }
                        html += '</div>';
                    }
                    html += '</div>';
                    divElement.querySelector('#detail-overlay-list').innerHTML = html;
                });
            }
            // Detail close
            divElement.querySelector('.detail-close').addEventListener('click', (_e) => {
                var _a;
                (_a = divElement.querySelector('#detail-overlay')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
            });
            // Checkbox handlers
            const arrCheckBoxes = divElement.querySelectorAll('.checkbox-row');
            for (var i = 0; i < arrCheckBoxes.length; i++) {
                arrCheckBoxes[i].addEventListener('change', async (_e) => {
                    //console.log(e.currentTarget, (e.currentTarget as HTMLInputElement).checked);
                    divElement.querySelector('.button-save').disabled = false;
                    if (extraFieldPosition === 1) {
                        await this.saveMapping(divElement, uploadBlock, jsonData, extraFields, searchString, uploadFunction, refreshFunction, true);
                    }
                });
            }
            (_a = divElement.querySelector('.checkbox-all')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
                //console.log('cb-length', arrCheckBoxes.length);
                for (var i = 0; i < arrCheckBoxes.length; i++) {
                    const tableRow = divElement.querySelector('#tablerow-' + (i));
                    //console.log('tablerow', i, tableRow);
                    if (tableRow != null) {
                        if (tableRow.style.display != 'none') {
                            //console.log('tablerow setting', e.currentTarget.checked, (arrCheckBoxes[i] as HTMLInputElement));
                            arrCheckBoxes[i].checked = e.currentTarget.checked;
                        }
                    }
                }
                divElement.querySelector('.button-save').disabled = false;
            });
            // Next, previous, save handlers
            (_b = this._SfButtonNext) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].next);
                //console.log(resultFunction);
                if (resultFunction != null) {
                    const jsonData1 = [];
                    for (var i = 0; i < resultFunction.values.length; i++) {
                        var mapped = false;
                        for (var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
                            if (mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
                                if (mappedArray.data.mappings.mappings[j].selected) {
                                    mapped = true;
                                }
                            }
                        }
                        for (var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
                            if (mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
                                if (mappedArray.data.mappings.mappings[j].selected) {
                                    mapped = true;
                                }
                            }
                        }
                        jsonData1.push({ id: resultFunction.values[i].id, mapped: mapped, data: resultFunction.values[i].fields, cols: jsonData[0].cols });
                    }
                    cursor.push({ prev: cursor[cursor.length - 1].next, next: resultFunction.cursor });
                    this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction, extraFields, uploadBlock, extraFieldPosition, colName, subfilter, statuteColName, extraHintsArr);
                }
            });
            (_c = this._SfButtonPrev) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async () => {
                cursor.pop();
                const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].prev);
                //console.log(resultFunction);
                if (resultFunction != null) {
                    const jsonData1 = [];
                    for (var i = 0; i < resultFunction.values.length; i++) {
                        var mapped = false;
                        for (var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
                            if (mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
                                if (mappedArray.data.mappings.mappings[j].selected) {
                                    mapped = true;
                                }
                            }
                        }
                        jsonData1.push({ id: resultFunction.values[i].id, mapped: mapped, data: resultFunction.values[i].fields, cols: jsonData[0].cols });
                    }
                    //console.log('clicked', jsonData1);
                    this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction, extraFields, uploadBlock, extraFieldPosition, colName, subfilter, statuteColName, extraHintsArr);
                }
            });
            (_f = this._SfButtonSave) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                await this.saveMapping(divElement, uploadBlock, jsonData, extraFields, searchString, uploadFunction, refreshFunction, false);
            });
            // const arrExtraFields = (divElement as HTMLDivElement).querySelectorAll('.extra-field') as NodeListOf<SfIMultitextarea>;
            // var totalFields = 0;
            // var filledFields = 0;
            // for(var i = 0; i < arrExtraFields.length; i++) {
            //   const extraField = arrExtraFields[i] as SfIMultitextarea;
            //   if(extraField.parentElement?.parentElement?.parentElement?.style.display != "none" && (extraField.parentElement?.parentElement?.parentElement?.firstChild?.firstChild?.firstChild as HTMLInputElement).checked) {
            //     if(extraField.getFilled()) {
            //       filledFields++;
            //     }
            //     totalFields++;
            //   }
            // }
            // (divElement as HTMLDivElement).querySelector("#span-extra-filled")!.innerHTML = "Fields: " + filledFields + "/" + totalFields + " completed";
            //console.log('Total fields = ' + totalFields + ', filled fields = ' + filledFields);
        };
        this.getPreviousExtraFields = (i, previousExtraFields, locationsForThisItem, showSearch) => {
            var userHtml = '';
            if (previousExtraFields != null && previousExtraFields.length === 9 && Object.keys(previousExtraFields[0]).length > 0) {
                userHtml += '<table class="proposed-users-table proposed-users-table-' + i + '">';
                userHtml += '<tr>';
                userHtml += '<th part="td-head">';
                userHtml += 'Reporter';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                userHtml += 'Approver';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                userHtml += 'Functionhead';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                userHtml += 'Auditor';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                userHtml += 'Viewer';
                userHtml += '</th>';
                userHtml += '</tr>';
                userHtml += '<tr>';
                userHtml += '<th part="td-head">';
                let strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g, '&quot;');
                let valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[3] != null ? previousExtraFields[3] : "") : "");
                let strValuesForThisItem = JSON.stringify(valuesForThisItem).replace(/"/g, '&quot;');
                userHtml += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-multitextarea class="extra-field" fields="' + strLocationsForThisItem + '" values="' + strValuesForThisItem + '" showCollapsed="true"></sf-i-multitextarea></div>';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g, '&quot;');
                valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[4] != null ? previousExtraFields[4] : "") : "");
                strValuesForThisItem = JSON.stringify(valuesForThisItem).replace(/"/g, '&quot;');
                userHtml += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-multitextarea class="extra-field" fields="' + strLocationsForThisItem + '" values="' + strValuesForThisItem + '" showCollapsed="true"></sf-i-multitextarea></div>';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g, '&quot;');
                valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[5] != null ? previousExtraFields[5] : "") : "");
                strValuesForThisItem = JSON.stringify(valuesForThisItem).replace(/"/g, '&quot;');
                userHtml += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-multitextarea class="extra-field" fields="' + strLocationsForThisItem + '" values="' + strValuesForThisItem + '" showCollapsed="true"></sf-i-multitextarea></div>';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g, '&quot;');
                valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[6] != null ? previousExtraFields[6] : "") : "");
                strValuesForThisItem = JSON.stringify(valuesForThisItem).replace(/"/g, '&quot;');
                userHtml += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-multitextarea class="extra-field" fields="' + strLocationsForThisItem + '" values="' + strValuesForThisItem + '" showCollapsed="true"></sf-i-multitextarea></div>';
                userHtml += '</th>';
                userHtml += '<th part="td-head">';
                strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g, '&quot;');
                valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[7] != null ? previousExtraFields[7] : "") : "");
                strValuesForThisItem = JSON.stringify(valuesForThisItem).replace(/"/g, '&quot;');
                userHtml += '<div class="' + (!showSearch ? 'truncate' : '') + '"><sf-i-multitextarea class="extra-field" fields="' + strLocationsForThisItem + '" values="' + strValuesForThisItem + '" showCollapsed="true"></sf-i-multitextarea></div>';
                userHtml += '</th>';
                userHtml += '</tr>';
                userHtml += '</table>';
                userHtml += '';
            }
            return userHtml;
        };
        this.refreshCalendar = async () => {
            //console.log('tabs',this.myOnboardingTab,this.TAB_CALENDAR);
            if (this.myOnboardingTab == this.TAB_CALENDAR) {
                const calendarJobs = await this.fetchCalendarJobs();
                if (calendarJobs.data.status == "0" || calendarJobs.data.status == "1") {
                    setTimeout(async () => {
                        await this.loadOnboardingCalendar();
                        this.refreshCalendar();
                    }, 10000);
                }
            }
        };
        this.renderNewOnboarding = () => {
            var html = '';
            html += '<div class="w-100 d-flex justify-center">';
            html += '<div>';
            html += '<div part="rcm-section-title" class="d-flex mt-20 mb-20 justify-center"><span>Client Sign Off</span></div><br />';
            html += '<label part="input-label" class="mt-5">Remarks</label><br />';
            html += '<textarea id="rcm-signoff" part="input" type="text"></textarea><br /><br />';
            html += '<label part="input-label" class="mt-5">Signature</label><br />';
            html += '<input id="rcm-signature" part="input" type="text" class="w-90"/><br /><br />';
            html += '<div class="d-flex justify-end align-center mt-20"><button part="button" class="d-flex align-center submit-signoff"><span class="material-symbols-outlined">signature</span>&nbsp;&nbsp;  Submit</button></div>';
            html += '<div class="mt-20 mb-10"></div>';
            html += '</div>';
            html += '</div>';
            this._SfOnboardingSignoffContainer.innerHTML = html;
        };
        this.renderOnboardingSignoff = (signoff) => {
            var _a;
            var html = '';
            // if(signoff.result == null) {
            this.renderNewOnboarding();
            // } else {
            html += '<div class="w-100 d-flex justify-evenly">';
            html += '<div>';
            html += '<div part="rcm-section-title" class="d-flex mt-20 mb-20"><span>New Sign Off</span></div><br />';
            html += '<label part="input-label" class="mt-5">Remarks</label><br />';
            html += '<textarea id="rcm-signoff" part="input" type="text"></textarea><br /><br />';
            html += '<label part="input-label" class="mt-5">Signature</label><br />';
            html += '<input id="rcm-signature" part="input" type="text" class="w-90"/><br /><br />';
            html += '<div class="d-flex justify-end align-center mt-20"><button part="button" class="d-flex align-center submit-signoff"><span class="material-symbols-outlined">signature</span>&nbsp;&nbsp;  Submit</button></div>';
            html += '<div class="mt-20 mb-10"></div>';
            html += '</div>';
            html += '<div>';
            html += '<div class="d-flex justify-between align-center">';
            html += '<div part="rcm-section-title" class="d-flex mt-20 mb-20 justify-center"><span>Sign Offs</span></div>';
            html += (this.disablesignoff == "yes" ? "" : '<button part="button" class="button-new d-flex align-center mt-20 mb-20"><span class="material-symbols-outlined">add</span><span>&nbsp;&nbsp;New</span></button>');
            html += '</div>';
            html += '<table class="mt-20">';
            html += '<thead>';
            html += '<th part="td-head" class="td-head">';
            html += 'Name';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Remarks';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Signature';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Timestamp';
            html += '</th>';
            html += '</thead>';
            const jsonData = JSON.parse(signoff.result.data.S);
            for (var i = 0; i < jsonData.length; i++) {
                var classBg = "";
                if (i % 2 === 0) {
                    classBg = 'td-light';
                }
                else {
                    classBg = 'td-dark';
                }
                html += '<tr>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += jsonData[i].username != null ? jsonData[i].username : "";
                html += '</td>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += jsonData[i].signofftext;
                html += '</td>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += jsonData[i].signature;
                html += '</td>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += new Date(parseInt(jsonData[i].timestamp));
                html += '</td>';
                //console.log(jsonData[i]);
            }
            html += '</table>';
            html += '</div>';
            html += '</div>';
            html += '<div class="w-100 d-flex justify-center">';
            html += '</div>';
            // }
            this._SfOnboardingSignoffContainer.innerHTML = html;
            (_a = this._SfOnboardingSignoffContainer.querySelector('.submit-signoff')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (_e) => {
                const signofftext = this._SfOnboardingSignoffContainer.querySelector('#rcm-signoff').value;
                const signoffsignature = this._SfOnboardingSignoffContainer.querySelector('#rcm-signature').value;
                await this.fetchUpdateSignOff(signofftext, signoffsignature);
                this.loadOnboardingSignoff();
            });
        };
        this.renderOnboardingCalendar = (_calendarJobs) => {
            //console.log('calendarjobs', calendarJobs);
            var _a;
            var html = '';
            html += '<div id="calendar-list-container" class="pb-10 pt-10 w-100">';
            // html += '<div class="d-flex justify-center align-center w-100">';
            //   html += '<h2 part="results-title">Calendar</h2>';
            // html += '</div>';
            // if(calendarJobs.data != null) {
            //   html += '<div class="d-flex justify-center align-center w-100">';
            //     html += '<div class="p-10">';
            //       html += '<div part="input-label" class="text-center">Job Status</div>';
            //       html += '<div class="d-flex align-center text-center">' + (calendarJobs.data.status == "0" ? "<span class=\"color-not-started material-icons\">schedule</span>&nbsp;Initialized" : calendarJobs.data.status == "1" ? "<span class=\"color-pending material-icons\">pending</span>&nbsp;In-Progress" : "<span class=\"color-done material-icons\">check_circle</span>&nbsp;Complete" ) + '</div>';
            //     html += '</div>';
            //     html += '<div class="p-10">';
            //       html += '<div part="input-label" class="text-center">Last Updated</div>';
            //       html += '<div class="text-center">' + new Date(calendarJobs.data.lastupdated).toLocaleString() + '</div>';
            //     html += '</div>';
            //   html += '</div>';
            // }
            html += '<div class="d-flex justify-center align-center w-100 mt-20">';
            html += '<select id="select-year" class="mr-10"><option value="2024">2024-25</option><option value="2023">2023-24</option></select>';
            html += '<button part="button" class="button-submit d-flex align-center"><span class="material-icons">bolt</span>&nbsp;<span>Update Calendar</span></button>';
            html += '</div>';
            html += '</div>';
            this._SfOnboardingCalendarContainer.innerHTML = html;
            (_a = this._SfOnboardingCalendarContainer.querySelector('.button-submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                const year = this._SfOnboardingCalendarContainer.querySelector('#select-year').value;
                //console.log(year);
                const usermap = await this.fetchGetMappedCalendar(year);
                if (usermap == null || usermap.usermap == null) {
                    this.setError(usermap.error);
                    setTimeout(() => {
                        this.clearMessages();
                    }, 10000);
                }
                else {
                    await this.fetchUpdateUsermap(usermap.usermap);
                }
            });
            //this.refreshCalendar();
        };
        this.renderOnboardingTriggers = (mappedTriggers, mappedSerializedAlertSchedules, triggersJobs) => {
            var html = '';
            html += '<div id="triggers-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingTriggersContainer.innerHTML = html;
            //console.log('rendering triggers...', (this._SfOnboardingTriggersContainer as HTMLDivElement).innerHTML);
            this.renderTaggingTable(this._SfOnboardingTriggersListContainer, mappedSerializedAlertSchedules, mappedTriggers, ["frequency", "obligation", "country", "statute"], this.uploadTriggersMapping, this.loadOnboardingTriggers, "triggers", ["id", "entityname", "locationname"], '', "", ["triggers"], triggersJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingInternalControls = (mappedInternalControls, mappedSerializedTriggers, internalcontrolsJobs) => {
            var html = '';
            html += '<div id="internalcontrols-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingInternalControlsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingInternalControlsListContainer, mappedSerializedTriggers, mappedInternalControls, ["frequency", "firstlineofdefence", "obligation", "country", "statute"], this.uploadInternalControlsMapping, this.loadOnboardingInternalControls, "internalcontrols", ["id", "entityname", "locationname"], '', "", ["internalcontrols"], internalcontrolsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingActivations = (mappedActivations, mappedSerializedExtensions, activationsJobs) => {
            var html = '';
            html += '<div id="activations-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingActivationsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingActivationListContainer, mappedSerializedExtensions, mappedActivations, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadActivationsMapping, this.loadOnboardingActivations, "activations", ["id", "entityname", "locationname"], '', "", ["activations"], activationsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingInvalidations = (mappedInvalidations, mappedSerializedExtensions, invalidationsJobs) => {
            var html = '';
            html += '<div id="invalidations-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingInvalidationsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingInvalidationListContainer, mappedSerializedExtensions, mappedInvalidations, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadInvalidationsMapping, this.loadOnboardingInvalidations, "invalidations", ["id", "entityname", "locationname"], '', "", ["invalidations"], invalidationsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingAlertSchedules = (mappedAlertSchedules, mappedSerializedExtensions, alertschedulesJobs) => {
            var html = '';
            html += '<div id="alertschedules-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingAlertSchedulesContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingAlertSchedulesListContainer, mappedSerializedExtensions, mappedAlertSchedules, ["alertschedules", "firstlineofdefence", "obligation", "country", "statute"], this.uploadAlertSchedulesMapping, this.loadOnboardingAlertSchedules, "alertschedules", ["id", "entityname", "locationname"], '', "", ["alertschedules"], alertschedulesJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingExtensions = (mappedExtensions, mappedSerializedDuedates, extensionsJobs) => {
            var html = '';
            html += '<div id="extensions-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingExtensionsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingExtensionsListContainer, mappedSerializedDuedates, mappedExtensions, ["duedate", "firstlineofdefence", "obligation", "country", "statute"], this.uploadExtensionsMapping, this.loadOnboardingExtensions, "extensions", ["id", "entityname", "locationname"], '', "", ["extensions"], extensionsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingDuedates = (mappedDuedates, mappedSerializedMakerCheckers, duedatesJobs) => {
            var html = '';
            html += '<div id="duedates-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingDuedatesContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingDuedatesListContainer, mappedSerializedMakerCheckers, mappedDuedates, ["duedate", "firstlineofdefence", "obligation", "country", "statute"], this.uploadDuedatesMapping, this.loadOnboardingDuedates, "duedates", ["id", "entityname", "locationname"], '', "", ["duedates"], duedatesJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingReporters = (mappedReporters, mappedSerializedTags, reportersJobs, _arrFeedbackReference) => {
            var html = '';
            html += '<div id="reporters-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingReportersContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingReportersListContainer, mappedSerializedTags, mappedReporters, ["obligation", "firstlineofdefence", "country", "statute", "reference"], this.uploadReportersMapping, this.loadOnboardingReporters, "reporters", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["reporters"], reportersJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");
        };
        this.renderOnboardingApprovers = (mappedApprovers, mappedSerializedReporters, approversJobs, _arrFeedbackReference) => {
            var html = '';
            html += '<div id="approvers-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingApproversContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingApproversListContainer, mappedSerializedReporters, mappedApprovers, ["obligation", "firstlineofdefence", "secondlineofdefence", "country", "statute", "reference"], this.uploadApproversMapping, this.loadOnboardingApprovers, "approvers", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["approvers"], approversJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");
        };
        this.renderOnboardingFunctionHeads = (mappedFunctionHeads, mappedSerializedApprovers, functionHeadsJobs, _arrFeedbackReference) => {
            var html = '';
            html += '<div id="functionheads-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingFunctionHeadsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingFunctionHeadsListContainer, mappedSerializedApprovers, mappedFunctionHeads, ["obligation", "firstlineofdefence", "thirdlineofdefence", "country", "statute", "reference"], this.uploadFunctionHeadsMapping, this.loadOnboardingFunctionHeads, "functionheads", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["functionheads"], functionHeadsJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");
        };
        this.renderOnboardingMakerCheckers = (mappedMakerCheckers, mappedSerializedDocs, makerCheckerJobs) => {
            var html = '';
            html += '<div id="makercheckers-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingMakerCheckersContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingMakerCheckersListContainer, mappedSerializedDocs, mappedMakerCheckers, ["firstlineofdefence", "obligation", "obligationtype", "country", "statute"], this.uploadMakerCheckersMapping, this.loadOnboardingMakerCheckers, "makercheckers", ["id", "entityname", "locationname"], this.apiIdTags, "&MakerChecker", ["makercheckers"], makerCheckerJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingDocs = (mappedDocs, mappedSerializedViewers, docsJobs) => {
            var html = '';
            html += '<div id="docs-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingDocsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingDocsListContainer, mappedSerializedViewers, mappedDocs, ["firstlineofdefence", "obligation", "obligationtype", "country", "statute"], this.uploadDocsMapping, this.loadOnboardingDocs, "docs", ["id", "entityname", "locationname"], this.apiIdTags, "&MakerChecker", ["docs"], docsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingAuditors = (mappedAuditors, mappedSerializedFunctionheads, auditorsJobs, _arrFeedbackReference) => {
            //console.log('inside rendering auditors..');
            var html = '';
            html += '<div id="auditors-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingAuditorsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingAuditorsListContainer, mappedSerializedFunctionheads, mappedAuditors, ["obligation", "firstlineofdefence", "country", "statute", "reference"], this.uploadAuditorsMapping, this.loadOnboardingAuditors, "auditors", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["auditors"], auditorsJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");
        };
        this.renderOnboardingViewers = (mappedViewers, mappedSerializedAuditors, viewersJobs, _arrFeedbackReference) => {
            //console.log('inside rendering viewers..');
            var html = '';
            html += '<div id="viewers-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingViewersContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingViewersListContainer, mappedSerializedAuditors, mappedViewers, ["obligation", "firstlineofdefence", "country", "statute", "reference"], this.uploadViewersMapping, this.loadOnboardingViewers, "viewers", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["viewers"], viewersJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");
        };
        this.renderOnboardingTags = (mappedTags, mappedSerializedFunctions, tagsJobs) => {
            var html = '';
            html += '<div id="tags-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingTagsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingTagsListContainer, mappedSerializedFunctions, mappedTags, ["obligationtype", "firstlineofdefence", "obligation", "reference", "country", "statute"], this.uploadTagsMapping, this.loadOnboardingTags, "tags", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Tag", ["tags"], tagsJobs, "tagtype", ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingFunctions = (mappedFunctions, mappedSerializedLocations, functionsJobs) => {
            var html = '';
            html += '<div id="functions-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            for (var i = 0; i < mappedSerializedLocations.data.mappings.mappings.length; i++) {
                if (mappedSerializedLocations.data.mappings.mappings[i].id == "33a0deab-e93e-41b7-831a-473f9ea3eea2") {
                    //console.log('mappedSerializedLocations', mappedSerializedLocations.data.mappings.mappings[i]);
                }
            }
            this._SfOnboardingFunctionsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingFunctionsListContainer, mappedSerializedLocations, mappedFunctions, ["obligation", "firstlineofdefence", "country", "statute", "reference"], this.uploadFunctionsMapping, this.loadOnboardingFunctions, "functions", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Function", ["functions"], functionsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingLocations = (mappedLocations, mappedSerializedEntities, locationsJobs) => {
            var html = '';
            html += '<div id="locations-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingLocationsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingLocationsListContainer, mappedSerializedEntities, mappedLocations, ["firstlineofdefence", "obligation", "country", "statute", "reference"], this.uploadLocationsMapping, this.loadOnboardingLocations, "locations", ["id", "countryname", "entityname"], this.apiIdTags, "&Location", ["locations"], locationsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingCompliances = (mappedStatutes, mappedCompliances) => {
            //console.log('mappedcompliances', mappedCompliances);
            //console.log('mappedstatutes', mappedStatutes);
            var searchString = "";
            for (var i = 0; i < mappedStatutes.data.mappings.mappings.length; i++) {
                if (mappedStatutes.data.mappings.mappings[i].selected) {
                    searchString += mappedStatutes.data.mappings.mappings[i].id + "|";
                }
            }
            searchString = searchString.slice(0, -1);
            //console.log('searchstring', searchString);
            var initCursor = "";
            var html = '';
            html += '<div class="d-flex flex-col w-100" style="height: 75vh">';
            html += '<div class="d-flex flex-col w-100">';
            html += '<label part="input-label">Search Compliances</label>';
            html += '<div class="d-flex">';
            html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." disabled/>';
            html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>';
            html += '</div>';
            html += '</div>';
            html += '<div id="compliances-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            html += '</div>';
            this._SfOnboardingCompliancesContainer.innerHTML = html;
            this._SfButtonSearch.addEventListener('click', async () => {
                //console.log('clicked', mappedStatutes.data.mappings.mappings);
                const searchString = this._SfInputSearch.value;
                //console.log('searchstring', searchString);
                if (searchString.length > 0) {
                    const arrSearchString = searchString.split('|');
                    var resultCompliances = {};
                    resultCompliances.values = [];
                    const chunkSize = 20;
                    for (let k = 0; k < arrSearchString.length; k += chunkSize) {
                        const chunk = arrSearchString.slice(k, k + chunkSize);
                        // do whatever
                        const tempResultCompliances = await this.fetchSearchCompliances(chunk.join('|'), "", k, arrSearchString.length);
                        //console.log(tempResultCompliances)
                        resultCompliances.values.push(...tempResultCompliances.values);
                        //console.log(resultCompliances);
                    }
                    if (resultCompliances != null) {
                        const jsonData = [];
                        const arrCompliancesFrequencies = {};
                        for (var i = 0; i < resultCompliances.values.length; i++) {
                            if (arrCompliancesFrequencies[resultCompliances.values[i].id] != null) {
                                continue;
                            }
                            else {
                                arrCompliancesFrequencies[resultCompliances.values[i].id] = 0;
                            }
                            var mapped = false;
                            var extraFields = null;
                            var previousExtraFields = null;
                            for (var j = 0; j < mappedCompliances.data.mappings.mappings.length; j++) {
                                if (mappedCompliances.data.mappings.mappings[j].id == resultCompliances.values[i].id) {
                                    if (mappedCompliances.data.mappings.mappings[j].selected) {
                                        mapped = true;
                                    }
                                    extraFields = mappedCompliances.data.mappings.mappings[j].extraFields;
                                }
                            }
                            for (j = 0; j < mappedStatutes.data.mappings.mappings.length; j++) {
                                if (mappedStatutes.data.mappings.mappings[j].statutename.trim() == JSON.parse(resultCompliances.values[i].fields.data[0])[6][0].trim()) {
                                    if (mappedStatutes.data.mappings.mappings[j].statutename.trim() == "Corporation Act, 2001") {
                                        //console.log('pushpreviousvalues', mappedStatutes.data.mappings.mappings[j], Object.keys(mappedStatutes.data.mappings.mappings[j].extraFields[0]));
                                    }
                                    previousExtraFields = mappedStatutes.data.mappings.mappings[j].extraFields;
                                }
                            }
                            jsonData.push({ id: resultCompliances.values[i].id, mapped: mapped, data: resultCompliances.values[i].fields, cols: ["country", "jurisdiction", "state", "category", "subcategory", "statute", "applicability", "obligation", "risk", "riskarea", "frequency", "penalty", "reference", "form", "subfrequency", "obligationtype", "duedate"], extraFields: extraFields, previousExtraFields: previousExtraFields });
                        }
                        this.renderMappingTable(this._SfOnboardingCompliancesListContainer, jsonData, [{ prev: initCursor, next: resultCompliances.cursor }], this.fetchSearchCompliances, searchString, mappedCompliances, resultCompliances.values.length, this.uploadCompliancesMapping, this.loadOnboardingCompliances, ["Client remarks", "FlaggGRC response"], -1, 0, "compliances", "", "statute", ["optional", "optional"]);
                    }
                }
            });
            //console.log('compliances searchstring', searchString);
            if (searchString != "") {
                this._SfInputSearch.value = searchString;
                this._SfButtonSearch.click();
            }
        };
        this.renderOnboardingEntities = (mappedEntities, mappedSerializedCountries, entitiesJobs, arrFeedbackReference) => {
            var html = '';
            html += '<div id="entities-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingEntitiesContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingEntitiesListContainer, mappedSerializedCountries, mappedEntities, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadEntitiesMapping, this.loadOnboardingEntities, "entities", ["id", "countryname"], this.apiIdTags, "&Entity", ["entities"], entitiesJobs, null, ["Client remarks", "FlaggGRC response"], arrFeedbackReference, "Guideline", "");
        };
        this.renderOnboardingCountries = (mappedCountries, mappedCompliances, countriesJobs) => {
            var html = '';
            html += '<div id="countries-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingCountriesContainer.innerHTML = html;
            const arr1 = [];
            for (var i = 0; i < mappedCompliances.data.mappings.mappings.length; i++) {
                if (mappedCompliances.data.mappings.mappings[i].selected) {
                    arr1.push(mappedCompliances.data.mappings.mappings[i]);
                }
            }
            mappedCompliances.data.mappings.mappings = arr1;
            // const arr2 = [];
            // for(var i = 0; i < mappedCountries.data.mappings.mappings.length; i++) {
            //   if(mappedCountries.data.mappings.mappings[i].selected) {
            //     arr2.push(mappedCountries.data.mappings.mappings[i]);
            //   }
            // }
            // mappedCountries.data.mappings.mappings = arr2;
            this.renderTaggingTable(this._SfOnboardingCountriesListContainer, mappedCompliances, mappedCountries, ["firstlineofdefence", "obligation", "country", "statute", "state", "subcategory"], this.uploadCountriesMapping, this.loadOnboardingCountries, "countries", ["id"], this.apiIdTags, "-Country", ["countries"], countriesJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");
        };
        this.renderOnboardingStatutes = (mappedStatutes) => {
            var initCursor = "";
            var html = '';
            html += '<div class="d-flex flex-col w-100" style="height: 75vh">';
            html += '<div class="d-flex flex-col w-100">';
            html += '<label part="input-label">Search Statutes</label>';
            html += '<div class="d-flex">';
            html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." autofocus/>';
            html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>';
            html += '</div>';
            html += '</div>';
            html += '<div id="statutes-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            html += '<div>';
            this._SfOnboardingStatutesContainer.innerHTML = html;
            this._SfInputSearch.addEventListener('keyup', (e) => {
                if (e.key == 'Enter') {
                    this._SfButtonSearch.click();
                }
            });
            this._SfButtonSearch.addEventListener('click', async () => {
                //console.log('clicked', mappedStatutes.data.mappings.mappings);
                const searchString = this._SfInputSearch.value;
                //console.log('clicked', searchString);
                if (searchString.length > 0) {
                    const resultStatutes = await this.fetchSearchStatutes(searchString, "");
                    if (resultStatutes != null) {
                        const jsonData = [];
                        for (var i = 0; i < resultStatutes.values.length; i++) {
                            var mapped = false;
                            var extraFields = null;
                            for (var j = 0; j < mappedStatutes.data.mappings.mappings.length; j++) {
                                if (mappedStatutes.data.mappings.mappings[j].id == resultStatutes.values[i].id) {
                                    //console.log('comparing',mappedStatutes.data.mappings.mappings[j].id,resultStatutes.values[i].id);
                                    if (mappedStatutes.data.mappings.mappings[j].selected) {
                                        mapped = true;
                                    }
                                    extraFields = mappedStatutes.data.mappings.mappings[j].extraFields;
                                }
                            }
                            jsonData.push({ id: resultStatutes.values[i].id, mapped: mapped, data: resultStatutes.values[i].fields, cols: ["country", "jurisdiction", "state", "name", "category", "subcategory", "applicability"], extraFields: extraFields });
                        }
                        //console.log('clicked', jsonData);
                        this.renderMappingTable(this._SfOnboardingStatutesListContainer, jsonData, [{ prev: initCursor, next: resultStatutes.cursor }], this.fetchSearchStatutes, searchString, mappedStatutes, resultStatutes.found, this.uploadStatutesMapping, this.loadOnboardingStatutes, ["Client remarks<br ><span class=\"title-byline\">(mention your queries, else leave blank)<span>", "Entity applicability<br /><span class=\"title-byline\">(only applicable in case of multiple corporate entities, else leave blank)<span>", "Locations applicability<br /><span class=\"title-byline\">(mention in case there is location-wise variance of applicability, else leave blank)<span>", "Reporters<br /><span class=\"title-byline\">(details of personnel who have the reponsibility of reporting)<span>", "Approvers<br /><span class=\"title-byline\">(details of personnel who have the reponsibility of approving)", "Functionheads<br /><span class=\"title-byline\">(details of personnel who head the function)", "Auditors<br /><span class=\"title-byline\">(mention details of auditors in case they are known)</span>", "Viewers<br /><span class=\"title-byline\">(mention details personnel who need to be given readonly access)</span>", "FlaggGRC response"], -1, 1, "statutes", "", "name", ["optional", "optional", "optional", "name - email@company.com", "name - email@company.com", "optional", "optional", "optional", "optional"]);
                    }
                }
            });
            if (mappedStatutes.data.mappings.searchstring != "" && mappedStatutes.data.mappings.searchstring != null) {
                this._SfInputSearch.value = mappedStatutes.data.mappings.searchstring;
                this._SfButtonSearch.click();
            }
        };
        this.clickOnboardingTabs = () => {
            if (this.myOnboardingTab == this.TAB_STATUTES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-statutes').click();
            }
            if (this.myOnboardingTab == this.TAB_COMPLIANCES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-compliances').click();
            }
            if (this.myOnboardingTab == this.TAB_COUNTRIES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-countries').click();
            }
            if (this.myOnboardingTab == this.TAB_ENTITIES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-entities').click();
            }
            if (this.myOnboardingTab == this.TAB_LOCATIONS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-locations').click();
            }
            if (this.myOnboardingTab == this.TAB_FUNCTIONS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-functions').click();
            }
            if (this.myOnboardingTab == this.TAB_TAGS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-tags').click();
            }
            if (this.myOnboardingTab == this.TAB_REPORTERS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-reporters').click();
            }
            if (this.myOnboardingTab == this.TAB_APPROVERS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-approvers').click();
            }
            if (this.myOnboardingTab == this.TAB_FUNCTION_HEADS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-functionheads').click();
            }
            if (this.myOnboardingTab == this.TAB_AUDITORS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-auditors').click();
            }
            if (this.myOnboardingTab == this.TAB_VIEWERS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-viewers').click();
            }
            if (this.myOnboardingTab == this.TAB_DOCS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-docs').click();
            }
            if (this.myOnboardingTab == this.TAB_MAKER_CHECKERS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-makercheckers').click();
            }
            if (this.myOnboardingTab == this.TAB_DUEDATES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-duedates').click();
            }
            if (this.myOnboardingTab == this.TAB_EXTENSIONS) {
                this._SfOnboardingTabContainer.querySelector('#extensions-tab-duedates').click();
            }
            if (this.myOnboardingTab == this.TAB_ALERTSCHEDULES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-alertschedules').click();
            }
            if (this.myOnboardingTab == this.TAB_ACTIVATIONS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-activations').click();
            }
            if (this.myOnboardingTab == this.TAB_INVALIDATION) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-invalidations').click();
            }
            if (this.myOnboardingTab == this.TAB_INTERNALCONTROLS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-internalcontrols').click();
            }
            if (this.myOnboardingTab == this.TAB_CALENDAR) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-calendar').click();
            }
        };
        this.renderOnboardingStatus = (status) => {
            for (var i = 0; i < status.length; i++) {
                const arrStatus = status[i].split(';');
                if (arrStatus[0].toLowerCase().indexOf('statutes') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-statutes').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('compliances') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-compliances').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('countries') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-countries').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('entities') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-entities').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('locations') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-locations').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('functions') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-functions').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('tags') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-tags').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('reporters') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-reporters').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('approvers') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-approvers').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('functionheads') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-functionheads').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('auditors') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-auditors').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('viewers') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-viewers').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('docs') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-docs').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('makercheckers') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-makercheckers').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('duedates') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-duedates').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('extensions') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-extensions').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('alertschedules') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-alertschedules').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('activations') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-activations').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('invalidations') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-invalidations').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('triggers') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-triggers').innerHTML = arrStatus[1];
                }
                if (arrStatus[0].toLowerCase().indexOf('internalcontrols') >= 0) {
                    this._SfOnboardingTabContainer.querySelector('#button-status-internalcontrols').innerHTML = arrStatus[1];
                }
            }
        };
        this.renderClearOnboardingContent = () => {
            this._SfOnboardingCountriesContainer.innerHTML = '';
            this._SfOnboardingEntitiesContainer.innerHTML = '';
            this._SfOnboardingLocationsContainer.innerHTML = '';
            this._SfOnboardingFunctionsContainer.innerHTML = '';
            this._SfOnboardingTagsContainer.innerHTML = '';
            this._SfOnboardingReportersContainer.innerHTML = '';
            this._SfOnboardingApproversContainer.innerHTML = '';
            this._SfOnboardingFunctionHeadsContainer.innerHTML = '';
            this._SfOnboardingAuditorsContainer.innerHTML = '';
            this._SfOnboardingViewersContainer.innerHTML = '';
            this._SfOnboardingDocsContainer.innerHTML = '';
            this._SfOnboardingMakerCheckersContainer.innerHTML = '';
            this._SfOnboardingDuedatesContainer.innerHTML = '';
            this._SfOnboardingAlertSchedulesContainer.innerHTML = '';
            this._SfOnboardingInternalControlsContainer.innerHTML = '';
        };
        this.renderOnboardingTabs = async () => {
            var _a, _b, _c, _f, _g, _h, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
            //console.log('render onboarding tabs', this.myOnboardingTabGroup);
            let initialLoad = false;
            if (this.myOnboardingTabGroup == "") {
                this.myOnboardingTabGroup = this.TAB_GROUP_BUSINESS_UNDERSTANDING;
                initialLoad = true;
            }
            //console.log('render onboarding tabs', this.myOnboardingTabGroup);
            this.selectedCbs = [];
            this._SfOnboardingTabContainer.innerHTML = '';
            var html = '';
            html += '<div class="d-flex w-100 justify-center">';
            html += '<button id="onboarding-tab-group-button-0" class="tab-button mb-10" part="' + (this.myOnboardingTabGroup == this.TAB_GROUP_BUSINESS_UNDERSTANDING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Business Insights</button>';
            html += '<button id="onboarding-tab-group-button-1" class="tab-button mb-10" part="' + (this.myOnboardingTabGroup == this.TAB_GROUP_GOVERNANCE_MAPPING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">GRC Integration</button>';
            html += '<button id="onboarding-tab-group-button-2" class="tab-button mb-10" part="' + (this.myOnboardingTabGroup == this.TAB_GROUP_CUSTOMIZATION ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Customization</button>';
            html += '<button id="onboarding-tab-group-button-3" class="tab-button mb-10" part="' + (this.myOnboardingTabGroup == this.TAB_GROUP_ROLLOUT ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Rollout</button>';
            html += '</div>';
            html += '<div id="onboarding-tab-group-0" class="' + (this.myOnboardingTabGroup == this.TAB_GROUP_BUSINESS_UNDERSTANDING ? '' : 'hide') + ' d-flex justify-center sub-button align-center">';
            html += '<button class="tab-button mb-10" id="onboarding-tab-statutes" part="' + (this.myOnboardingTab == this.TAB_STATUTES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Statutes<br /><span id="button-status-statutes" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-compliances" part="' + (this.myOnboardingTab == this.TAB_COMPLIANCES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Compliances<br /><span id="button-status-compliances" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-countries" part="' + (this.myOnboardingTab == this.TAB_COUNTRIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Countries<br /><span id="button-status-countries" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-entities" part="' + (this.myOnboardingTab == this.TAB_ENTITIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Entities<br /><span id="button-status-entities" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-locations" part="' + (this.myOnboardingTab == this.TAB_LOCATIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Locations<br /><span id="button-status-locations" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '</div>';
            html += '<div id="onboarding-tab-group-1" class="' + (this.myOnboardingTabGroup == this.TAB_GROUP_GOVERNANCE_MAPPING ? '' : 'hide') + ' d-flex justify-center flex-wrap sub-button">';
            html += '<button class="tab-button mb-10" id="onboarding-tab-functions" part="' + (this.myOnboardingTab == this.TAB_FUNCTIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Functions<br /><span id="button-status-functions" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-tags" part="' + (this.myOnboardingTab == this.TAB_TAGS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Tags<br /><span id="button-status-tags" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-reporters" part="' + (this.myOnboardingTab == this.TAB_REPORTERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Reporters<br /><span id="button-status-reporters" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-approvers" part="' + (this.myOnboardingTab == this.TAB_APPROVERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Approvers<br /><span id="button-status-approvers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-functionheads" part="' + (this.myOnboardingTab == this.TAB_FUNCTION_HEADS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Function Heads<br /><span id="button-status-functionheads" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-auditors" part="' + (this.myOnboardingTab == this.TAB_AUDITORS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Auditors<br /><span id="button-status-auditors" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-viewers" part="' + (this.myOnboardingTab == this.TAB_VIEWERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Viewers<br /><span id="button-status-viewers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '</div>';
            html += '<div id="onboarding-tab-group-2" class="' + (this.myOnboardingTabGroup == this.TAB_GROUP_CUSTOMIZATION ? '' : 'hide') + ' d-flex justify-center flex-wrap sub-button">';
            html += '<button class="tab-button mb-10" id="onboarding-tab-docs" part="' + (this.myOnboardingTab == this.TAB_DOCS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Docs<br /><span id="button-status-docs" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-makercheckers" part="' + (this.myOnboardingTab == this.TAB_MAKER_CHECKERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Maker Checkers<br /><span id="button-status-makercheckers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-duedates" part="' + (this.myOnboardingTab == this.TAB_DUEDATES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Duedates<br /><span id="button-status-duedates" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-extensions" part="' + (this.myOnboardingTab == this.TAB_EXTENSIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Extensions<br /><span id="button-status-extensions" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-alertschedules" part="' + (this.myOnboardingTab == this.TAB_ALERTSCHEDULES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Alert Schedules<br /><span id="button-status-alertschedules" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-activations" part="' + (this.myOnboardingTab == this.TAB_ACTIVATIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Activations<br /><span id="button-status-activations" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-invalidations" part="' + (this.myOnboardingTab == this.TAB_INVALIDATION ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Invalidations<br /><span id="button-status-invalidations" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-triggers" part="' + (this.myOnboardingTab == this.TAB_TRIGGERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Triggers<br /><span id="button-status-triggers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-internalcontrols" part="' + (this.myOnboardingTab == this.TAB_INTERNALCONTROLS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Internal Controls<br /><span id="button-status-internalcontrols" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '</div>';
            html += '<div id="onboarding-tab-group-3" class="' + (this.myOnboardingTabGroup == this.TAB_GROUP_ROLLOUT ? '' : 'hide') + ' d-flex justify-center flex-wrap sub-button">';
            html += '<button class="tab-button mb-10" id="onboarding-tab-signoff" part="' + (this.myOnboardingTab == this.TAB_SIGNOFF ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Sign Off<br /><span id="button-status-signoff" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-calendar" part="' + (this.myOnboardingTab == this.TAB_CALENDAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Calendar<br /><span id="button-status-calendar" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
            html += '</div>';
            this._SfOnboardingTabContainer.innerHTML = html;
            (_a = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-statutes')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_STATUTES;
                this.renderOnboardingTabs();
                await this.loadOnboardingStatutes();
            });
            (_b = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-compliances')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_COMPLIANCES;
                this.renderOnboardingTabs();
                this.loadOnboardingCompliances();
            });
            (_c = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-countries')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_COUNTRIES;
                this.renderOnboardingTabs();
                this.loadOnboardingCountries();
            });
            (_f = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-entities')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_ENTITIES;
                this.renderOnboardingTabs();
                this.loadOnboardingEntities();
            });
            (_g = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-locations')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_LOCATIONS;
                this.renderOnboardingTabs();
                this.loadOnboardingLocations();
            });
            (_h = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-functions')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_FUNCTIONS;
                this.renderOnboardingTabs();
                this.loadOnboardingFunctions();
            });
            (_k = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-tags')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_TAGS;
                this.renderOnboardingTabs();
                this.loadOnboardingTags();
            });
            (_l = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-reporters')) === null || _l === void 0 ? void 0 : _l.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_REPORTERS;
                this.renderOnboardingTabs();
                this.loadOnboardingReporters();
            });
            (_m = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-approvers')) === null || _m === void 0 ? void 0 : _m.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_APPROVERS;
                this.renderOnboardingTabs();
                this.loadOnboardingApprovers();
            });
            (_o = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-functionheads')) === null || _o === void 0 ? void 0 : _o.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_FUNCTION_HEADS;
                this.renderOnboardingTabs();
                this.loadOnboardingFunctionHeads();
            });
            (_p = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-auditors')) === null || _p === void 0 ? void 0 : _p.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_AUDITORS;
                this.renderOnboardingTabs();
                this.loadOnboardingAuditors();
            });
            (_q = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-viewers')) === null || _q === void 0 ? void 0 : _q.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_VIEWERS;
                this.renderOnboardingTabs();
                this.loadOnboardingViewers();
            });
            (_r = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-makercheckers')) === null || _r === void 0 ? void 0 : _r.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_MAKER_CHECKERS;
                this.renderOnboardingTabs();
                this.loadOnboardingMakerCheckers();
            });
            (_s = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-docs')) === null || _s === void 0 ? void 0 : _s.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_DOCS;
                this.renderOnboardingTabs();
                this.loadOnboardingDocs();
            });
            (_t = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-duedates')) === null || _t === void 0 ? void 0 : _t.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_DUEDATES;
                this.renderOnboardingTabs();
                this.loadOnboardingDuedates();
            });
            (_u = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-alertschedules')) === null || _u === void 0 ? void 0 : _u.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_ALERTSCHEDULES;
                this.renderOnboardingTabs();
                this.loadOnboardingAlertSchedules();
            });
            (_v = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-activations')) === null || _v === void 0 ? void 0 : _v.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_ACTIVATIONS;
                this.renderOnboardingTabs();
                this.loadOnboardingActivations();
            });
            (_w = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-invalidations')) === null || _w === void 0 ? void 0 : _w.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_INVALIDATION;
                this.renderOnboardingTabs();
                this.loadOnboardingInvalidations();
            });
            (_x = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-triggers')) === null || _x === void 0 ? void 0 : _x.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_TRIGGERS;
                this.renderOnboardingTabs();
                this.loadOnboardingTriggers();
            });
            (_y = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-extensions')) === null || _y === void 0 ? void 0 : _y.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_EXTENSIONS;
                this.renderOnboardingTabs();
                this.loadOnboardingExtensions();
            });
            (_z = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-internalcontrols')) === null || _z === void 0 ? void 0 : _z.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_INTERNALCONTROLS;
                this.renderOnboardingTabs();
                this.loadOnboardingInternalControls();
            });
            (_0 = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-signoff')) === null || _0 === void 0 ? void 0 : _0.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_SIGNOFF;
                this.renderOnboardingTabs();
                this.loadOnboardingSignoff();
            });
            (_1 = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-calendar')) === null || _1 === void 0 ? void 0 : _1.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_CALENDAR;
                this.renderOnboardingTabs();
                this.loadOnboardingCalendar();
            });
            this._SfOnboardingTabGroupButton0.addEventListener('click', () => {
                this.myOnboardingTabGroup = this.TAB_GROUP_BUSINESS_UNDERSTANDING;
                this.hideTabContainers();
                this.myOnboardingTab = '';
                this.renderOnboardingTabs();
            });
            this._SfOnboardingTabGroupButton1.addEventListener('click', () => {
                this.myOnboardingTabGroup = this.TAB_GROUP_GOVERNANCE_MAPPING;
                this.hideTabContainers();
                this.myOnboardingTab = '';
                this.renderOnboardingTabs();
            });
            this._SfOnboardingTabGroupButton2.addEventListener('click', () => {
                this.myOnboardingTabGroup = this.TAB_GROUP_CUSTOMIZATION;
                this.hideTabContainers();
                this.myOnboardingTab = '';
                this.renderOnboardingTabs();
            });
            this._SfOnboardingTabGroupButton3.addEventListener('click', () => {
                this.myOnboardingTabGroup = this.TAB_GROUP_ROLLOUT;
                this.hideTabContainers();
                this.myOnboardingTab = '';
                this.renderOnboardingTabs();
            });
            const statusOnboarding = await this.fetchOnboardingStatus();
            this.renderOnboardingStatus(statusOnboarding.result);
            this.renderClearOnboardingContent();
            if (initialLoad) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-statutes').click();
            }
        };
        this.renderRcmProceed = (div, button) => {
            var _a;
            var html = '';
            html += '<div class="mb-20 mt-20">';
            html += '<button id="button-proceed" part="button">Proceed</button>';
            html += '</div>';
            div.innerHTML += html;
            (_a = div.querySelector('#button-proceed')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                button === null || button === void 0 ? void 0 : button.click();
            });
        };
        this.renderRcmSelectedComplianceInProject = (div) => {
            var html = '<div class="w-100" part="rcm-section">';
            html += '<div part="rcm-section-title" class="mb-10">Selected Compliance</div>';
            if (this.rcmSelectedCompliance == null || this.rcmSelectedCompliance.values == null || this.rcmSelectedCompliance.values.length === 0) {
                html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No compliances found</p></div>';
                div.innerHTML += html;
                return;
            }
            html += '<table>';
            html += '<thead>';
            html += '<th part="td-head" class="td-head">';
            html += 'Id';
            html += '</th>';
            for (var i = 0; i < Object.keys(this.rcmSelectedCompliance.values).length; i++) {
                if (this.arrCols.includes(Object.keys(this.rcmSelectedCompliance.values)[i])) {
                    html += '<th part="td-head" class="td-head">';
                    html += Object.keys(this.rcmSelectedCompliance.values)[i];
                    html += '</th>';
                }
            }
            html += '</thead>';
            html += '<tbody>';
            var classBg = "";
            classBg = 'td-light';
            html += '<tr>';
            html += '<td part="td-body" class="' + classBg + '">';
            html += '<sf-i-elastic-text class="statute id-' + i + '" text="' + (this.rcmSelectedCompliance.id) + '" minLength="80"></sf-i-elastic-text>';
            html += '</td>';
            //let data = JSON.parse(jsonData[i].fields.data);
            for (var j = 0; j < Object.keys(this.rcmSelectedCompliance.values).length; j++) {
                const objectKey = Object.keys(this.rcmSelectedCompliance.values)[j];
                if (this.arrCols.includes(objectKey)) {
                    html += '<td part="td-body" class="td-body ' + classBg + '">';
                    if (Array.isArray(this.rcmSelectedCompliance.values[objectKey].value)) {
                        for (var k = 0; k < this.rcmSelectedCompliance.values[objectKey].value.length; k++) {
                            if (this.rcmSelectedCompliance.values[objectKey].text != null) {
                                html += ('<sf-i-elastic-text text="' + this.rcmSelectedCompliance.values[objectKey].text[k] + '" minLength="80"></sf-i-elastic-text>');
                            }
                            else {
                                html += ('<sf-i-elastic-text text="' + this.rcmSelectedCompliance.values[objectKey].value[k] + '" minLength="80"></sf-i-elastic-text>');
                            }
                            if (k < (this.rcmSelectedCompliance.values[objectKey].value.length - 1)) {
                                html += "; ";
                            }
                        }
                    }
                    else {
                        if (this.rcmSelectedCompliance.values[objectKey].text != null) {
                            html += ('<sf-i-elastic-text text="' + this.rcmSelectedCompliance.values[objectKey].value + '" minLength="80"></sf-i-elastic-text>');
                        }
                        else {
                            html += ('<sf-i-elastic-text text="' + this.rcmSelectedCompliance.values[objectKey].value + '" minLength="80"></sf-i-elastic-text>');
                        }
                    }
                    html += '</td>';
                }
            }
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            div.innerHTML += html;
        };
        this.renderRcmCompliances = (updatedCompliances) => {
            var html = '<div class="w-100" part="rcm-section">';
            html += '<div part="rcm-section-title" class="mb-10">Recently Updated Compliances</div>';
            html += '<div part="rcm-setting" class="d-flex mt-20 mb-20 align-center"><div class="mr-10">Show Completed</div><input id="cb-completed" type="checkbox" /></div>';
            html += '<table>';
            html += '<thead>';
            html += '<th part="td-head" class="td-head left-sticky">';
            html += 'Select';
            html += '</th>';
            html += '<th part="td-head" class="td-head left-sticky">';
            html += 'Complete';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Id';
            html += '</th>';
            for (var i = 0; i < Object.keys(updatedCompliances[0].values).length; i++) {
                if (this.arrCols.includes(Object.keys(updatedCompliances[0].values)[i])) {
                    html += '<th part="td-head" class="td-head">';
                    html += Object.keys(updatedCompliances[0].values)[i];
                    html += '</th>';
                }
            }
            html += '</thead>';
            html += '<tbody>';
            for (var i = 0; i < updatedCompliances.length; i++) {
                var classBg = "";
                if (i % 2 === 0) {
                    classBg = 'td-light';
                }
                else {
                    classBg = 'td-dark';
                }
                html += '<tr id="row-' + (updatedCompliances[i].id) + '">';
                html += '<td part="td-body" class="' + classBg + ' left-sticky">';
                html += '<div id="select-' + i + '"><button id="button-' + (updatedCompliances[i].id) + '" class="buttonselect-icon button-' + i + '" part="button-icon-small"><span class="material-symbols-outlined">navigate_next</span></button></div>';
                html += '</td>';
                html += '<td part="td-body" class="' + classBg + '">';
                html += '<div class="d-flex"><button id="button-lock-' + (updatedCompliances[i].id) + '" class="mr-10 button-lock-icon button-lock-' + i + '" part="button-icon-small"><span class="material-symbols-outlined">done</span></button></div>';
                html += '</td>';
                html += '<td part="td-body" class="' + classBg + '">';
                html += '<sf-i-elastic-text class="statute id-' + i + '" text="' + (updatedCompliances[i].id) + '" minLength="80"></sf-i-elastic-text>';
                html += '</td>';
                //let data = JSON.parse(jsonData[i].fields.data);
                for (var j = 0; j < Object.keys(updatedCompliances[i].values).length; j++) {
                    const objectKey = Object.keys(updatedCompliances[i].values)[j];
                    if (this.arrCols.includes(objectKey)) {
                        html += '<td part="td-body" class="td-body ' + classBg + '">';
                        if (Array.isArray(updatedCompliances[i].values[objectKey].value)) {
                            for (var k = 0; k < updatedCompliances[i].values[objectKey].value.length; k++) {
                                if (updatedCompliances[i].values[objectKey].text != null) {
                                    html += ('<sf-i-elastic-text text="' + updatedCompliances[i].values[objectKey].text[k] + '" minLength="80"></sf-i-elastic-text>');
                                }
                                else {
                                    html += ('<sf-i-elastic-text text="' + updatedCompliances[i].values[objectKey].value[k] + '" minLength="80"></sf-i-elastic-text>');
                                }
                                if (k < (updatedCompliances[i].values[objectKey].value.length - 1)) {
                                    html += "; ";
                                }
                            }
                        }
                        else {
                            if (updatedCompliances[i].values[objectKey].text != null) {
                                html += ('<sf-i-elastic-text text="' + updatedCompliances[i].values[objectKey].value + '" minLength="80"></sf-i-elastic-text>');
                            }
                            else {
                                html += ('<sf-i-elastic-text text="' + updatedCompliances[i].values[objectKey].value + '" minLength="80"></sf-i-elastic-text>');
                            }
                        }
                        html += '</td>';
                    }
                }
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            this._SfRcmComplianceContainer.innerHTML = html;
        };
        this.renderRcmLockedCompliances = (lockedCompliances) => {
            //console.log('rendering locked', lockedCompliances);
            for (var i = 0; i < lockedCompliances.data.length; i++) {
                // //console.log(lockedCompliances.data[i].complianceid);
                // //console.log(((this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#button-lock-' + lockedCompliances.data[i].complianceid.S) as HTMLButtonElement));
                // ((this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#button-lock-' + lockedCompliances.data[i].complianceid.S) as HTMLButtonElement).style.display = 'none';
                this._SfRcmComplianceContainer.querySelector('#row-' + lockedCompliances.data[i].complianceid.S).style.display = 'none';
                this._SfRcmComplianceContainer.querySelector('#button-lock-' + lockedCompliances.data[i].complianceid.S).classList.add('gone');
            }
        };
        this.renderRcmUnlockedCompliances = (lockedCompliances) => {
            //console.log('rendering unlocked', lockedCompliances);
            for (var i = 0; i < lockedCompliances.data.length; i++) {
                //console.log('#row-' + lockedCompliances.data[i].complianceid.S);
                this._SfRcmComplianceContainer.querySelector('#row-' + lockedCompliances.data[i].complianceid.S).style.display = 'table-row';
            }
        };
        this.renderRcmProjects = (div, projects) => {
            //console.log('projects', projects);
            var html = '<div class="w-100" part="rcm-section">';
            html += '<div part="rcm-section-title" class="mt-20 mb-10">Affected Projects</div>';
            if (projects == null || projects.length === 0) {
                html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No projects found</p></div>';
                div.innerHTML += html;
                return;
            }
            // //console.log(updatedCompliances);
            html += '<table>';
            html += '<thead>';
            // html += '<th part="td-head" class="td-head left-sticky">'
            // html += 'Select';
            // html += '</th>'
            html += '<th part="td-head" class="td-head">';
            html += 'Id';
            html += '</th>';
            for (var i = 0; i < Object.keys(projects[0]).length; i++) {
                if (this.arrRcmProjectCols.includes(Object.keys(projects[0])[i])) {
                    html += '<th part="td-head" class="td-head">';
                    html += Object.keys(projects[0])[i];
                    html += '</th>';
                }
            }
            html += '</thead>';
            html += '<tbody>';
            for (var i = 0; i < projects.length; i++) {
                var classBg = "";
                if (i % 2 === 0) {
                    classBg = 'td-light';
                }
                else {
                    classBg = 'td-dark';
                }
                html += '<tr>';
                //   html += '<td part="td-action" class="left-sticky">';
                //   html += '<div id="select-'+i+'"><button id="button-'+i+'" class="button-icon button-'+i+'"><span class="material-symbols-outlined">navigate_next</span></button></div>';
                //   html += '</td>';
                html += '<td part="td-body" class="' + classBg + '">';
                html += '<sf-i-elastic-text class="statute id-' + i + '" text="' + (projects[i].id) + '" minLength="80"></sf-i-elastic-text>';
                html += '</td>';
                //   //let data = JSON.parse(jsonData[i].fields.data);
                for (var j = 0; j < Object.keys(projects[i]).length; j++) {
                    const objectKey = Object.keys(projects[i])[j];
                    if (this.arrRcmProjectCols.includes(objectKey)) {
                        html += '<td part="td-body" class="td-body ' + classBg + '">';
                        //console.log('value',projects[i][objectKey]);
                        if (Array.isArray(projects[i][objectKey])) {
                            for (var k = 0; k < projects[i][objectKey].value.length; k++) {
                                html += ('<sf-i-elastic-text text="' + projects[i][objectKey][0] + '" minLength="80"></sf-i-elastic-text>');
                            }
                        }
                        else {
                            //console.log('not array');
                            html += ('<sf-i-elastic-text text="' + projects[i][objectKey].replace(/"/g, '') + '" minLength="80"></sf-i-elastic-text>');
                        }
                        html += '</td>';
                    }
                }
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            div.innerHTML += html;
            // const arrButtons = (this._SfRcmComplianceContainer as HTMLDivElement).querySelectorAll('.button-icon') as NodeListOf<HTMLButtonElement>;
            // for(i = 0; i < arrButtons.length; i++) {
            //   arrButtons[i].addEventListener('click', (e: any) => {
            //     const index = e.currentTarget.id.split('-')[1];
            //     this.rcmSelectedCompliance = updatedCompliances[index];
            //     ((this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-projects') as HTMLButtonElement).click();
            //   })
            // }
        };
        this.renderRcmSelectedDate = (div) => {
            var html = "";
            html = '<div class="w-100" part="rcm-section">';
            html += '<div part="rcm-section-title" class="mt-20 mb-20">Trigger Information</div>';
            if (this.rcmSelectedDate == null || this.rcmSelectedMessage == null) {
                html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No trigger information found</p></div>';
                div.innerHTML += html;
                return;
            }
            html += '<label part="input-label" class="mt-5">Date of Trigger</label><br />';
            html += '<p>' + this.rcmSelectedDate + '</p>';
            html += '<label part="input-label" class="mt-5">Notification Message</label><br />';
            html += '<p>' + this.rcmSelectedMessage + '</p>';
            html += '<div class="mt-20 mb-10"></div></div>';
            div.innerHTML += html;
        };
        this.renderRcmDate = (div) => {
            var html = '<div class="w-100" part="rcm-section">';
            html += '<div part="rcm-section-title" class="mt-20 mb-20">Trigger Information</div>';
            html += '<label part="input-label" class="mt-5">Date of Trigger</label><br />';
            html += '<input id="rcm-date" part="input" type="date" /><br /><br />';
            html += '<label part="input-label" class="mt-5">Notification Message</label><br />';
            html += '<textarea id="rcm-message" class="w-100" part="input" ></textarea>';
            html += '<div class="mt-20 mb-10"></div></div>';
            div.innerHTML += html;
        };
        this.renderRcmJobs = (div) => {
            var html = '<div class="w-100" part="rcm-section">';
            html += '<div part="rcm-section-title" class="mb-20">New RCM Update Job</div>';
            html += '<button id="button-submit"part="button-icon-small" class="material-icons button-expand mt-5">add_circle</button><br />';
            html += '</div>';
            div.innerHTML += html;
        };
        this.renderRcmSelectedJobs = (div, jobs) => {
            var html = '<div class="w-100" part="rcm-section">';
            html += '<div part="rcm-section-title" class="mb-10">Previous Jobs For The Selected Compliance</div>';
            if (jobs.data.length === 0) {
                html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No jobs found</p></div>';
                div.innerHTML += html;
                return;
            }
            html += '<table>';
            html += '<thead>';
            html += '<th part="td-head" class="td-head">';
            html += 'Id';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Creation Time';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Status';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += '';
            html += '</th>';
            html += '</thead>';
            html += '<tbody>';
            for (var i = jobs.data.length - 1; i >= 0; i--) {
                var classBg = "";
                if (i % 2 === 0) {
                    classBg = 'td-light';
                }
                else {
                    classBg = 'td-dark';
                }
                html += '<tr>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += jobs.data[i].id.S;
                html += '</td>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += jobs.data[i].lastupdated.S;
                html += '</td>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += jobs.data[i].status.S == "0" ? "created" : jobs.data[i].status.S == "1" ? "in-progress" : jobs.data[i].status.S == "2" ? "completed" : "notified";
                html += '</td>';
                html += '<td part="td-body" class="td-body ' + classBg + '">';
                html += jobs.data[i].status.S == "0" ? "<span class=\"color-not-started material-icons\">schedule</span>" : jobs.data[i].status.S == "1" ? "<span class=\"color-pending material-icons\">pending</span>" : jobs.data[i].status.S == "2" ? "<span class=\"color-done material-icons\">check_circle</span>" : "<span class=\"color-done material-icons\">notifications</span>";
                html += '</td>';
                html += '</tr>';
            }
            html += '</thead>';
            html += '</tbody>';
            html += '</table></div>';
            div.innerHTML += html;
        };
        this.renderRcmNotifications = (notifs) => {
            var html = '';
            //console.log('inside rcm notifications', notifs);
            if (notifs.data.length > 0) {
                if (this.flowRcmNotification === 0) {
                    html += '<div class="d-flex align-center">';
                    html += '<span part="rcm-section-title-icon" class="material-symbols-outlined mr-10">notifications</span>';
                    html += '<div part="rcm-section-title" class="mr-10">Regulatory Alerts</div>';
                    html += ('<div part="notif-icon-badge" class="mr-20" >' + notifs.data.length + '</div>');
                    html += '<button id="button-expand" part="icon-button-small" class="material-symbols-outlined">keyboard_arrow_down</button>';
                    html += '</div>';
                }
                else {
                    html += '<div class="w-100" part="rcm-section-notification">';
                    html += '<div class="d-flex align-center mb-20">';
                    html += '<span part="rcm-section-title-icon" class="material-symbols-outlined mr-10">notifications</span>';
                    html += '<div part="rcm-section-title">Regulatory Alerts</div>';
                    html += '</div>';
                    html += '<div id="rcm-container-list" class="mb-10">';
                    for (var i = 0; i < notifs.data.length; i++) {
                        html += '<div part="rcm-container-list-item">';
                        html += notifs.data[i].message;
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
            }
            else {
            }
            this._SfRcmContainer.innerHTML = html;
            if (notifs.data.length > 0) {
                if (this.flowRcmNotification === 0) {
                    this._SfRcmContainer.querySelector('#button-expand').addEventListener('click', () => {
                        this.flowRcmNotification = 1;
                        this.renderRcmNotifications(notifs);
                    });
                }
            }
        };
        this.renderRcmTabs = () => {
            //console.log('render rcm tabs');
            var _a, _b, _c, _f;
            this._SfRcmTabContainer.innerHTML = '';
            var html = '';
            html += '<button class="tab-button mb-10" id="rcm-tab-compliances" part="' + (this.myRcmTab == this.TAB_RCM_COMPLIANCES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Compliances</button>';
            html += '<button class="tab-button mb-10" id="rcm-tab-projects" part="' + (this.myRcmTab == this.TAB_RCM_PROJECTS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Projects</button>';
            html += '<button class="tab-button mb-10" id="rcm-tab-date" part="' + (this.myRcmTab == this.TAB_RCM_DATE ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Trigger</button>';
            html += '<button class="tab-button mb-10" id="rcm-tab-jobs" part="' + (this.myRcmTab == this.TAB_RCM_JOBS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Jobs</button>';
            this._SfRcmTabContainer.innerHTML = html;
            (_a = this._SfRcmTabContainer.querySelector('#rcm-tab-compliances')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                this.myRcmTab = this.TAB_RCM_COMPLIANCES;
                this.renderRcmTabs();
                await this.loadRcmCompliances();
            });
            (_b = this._SfRcmTabContainer.querySelector('#rcm-tab-projects')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                this.myRcmTab = this.TAB_RCM_PROJECTS;
                this.renderRcmTabs();
                await this.loadRcmProjects();
                //await this.loadOnboardingStatutes();
            });
            (_c = this._SfRcmTabContainer.querySelector('#rcm-tab-date')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async () => {
                this.myRcmTab = this.TAB_RCM_DATE;
                this.renderRcmTabs();
                await this.loadRcmDate();
                //await this.loadOnboardingStatutes();
            });
            (_f = this._SfRcmTabContainer.querySelector('#rcm-tab-jobs')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                this.myRcmTab = this.TAB_RCM_JOBS;
                this.renderRcmTabs();
                await this.loadRcmJobs();
                //await this.loadOnboardingStatutes();
            });
        };
        this.proceedToCalendar = async () => {
            this.renderRoleTabs();
            await this.fetchAndYearlyRenderUserCalendar_2();
            this.enableCalendar();
            if (this.events != null) {
                this.renderTabs(this.TAB_YEAR);
                this.renderCalendar();
            }
        };
        this.renderRoleTabs = () => {
            //console.log('render role tabs');
            var _a, _b, _c, _f, _g;
            this._SfRoleTabContainer.innerHTML = '';
            var html = '';
            html += '<button class="tab-button" id="consumer-tab-reporter" part="' + (this.myRole == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Reporter</button>';
            html += '<button class="tab-button" id="consumer-tab-approver" part="' + (this.myRole == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Approver</button>';
            html += '<button class="tab-button" id="consumer-tab-functionhead" part="' + (this.myRole == this.TAB_FUNCTION_HEAD ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Function Head</button>';
            html += '<button class="tab-button" id="consumer-tab-auditor" part="' + (this.myRole == this.TAB_AUDITOR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Auditor</button>';
            html += '<button class="tab-button" id="consumer-tab-viewer" part="' + (this.myRole == this.TAB_VIEWER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Viewer</button>';
            this._SfRoleTabContainer.innerHTML = html;
            (_a = this._SfRoleTabContainer.querySelector('#consumer-tab-reporter')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                var _a;
                this.myRole = this.TAB_REPORTER;
                this.renderRoleTabs();
                // this.proceedToCalendar();
                (_a = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _a === void 0 ? void 0 : _a.click();
            });
            (_b = this._SfRoleTabContainer.querySelector('#consumer-tab-approver')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                var _a;
                this.myRole = this.TAB_APPROVER;
                this.renderRoleTabs();
                // this.proceedToCalendar();
                (_a = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _a === void 0 ? void 0 : _a.click();
            });
            (_c = this._SfRoleTabContainer.querySelector('#consumer-tab-functionhead')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async () => {
                var _a;
                this.myRole = this.TAB_FUNCTION_HEAD;
                this.renderRoleTabs();
                // this.proceedToCalendar();
                (_a = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _a === void 0 ? void 0 : _a.click();
            });
            (_f = this._SfRoleTabContainer.querySelector('#consumer-tab-auditor')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                var _a;
                this.myRole = this.TAB_AUDITOR;
                this.renderRoleTabs();
                // this.proceedToCalendar();
                (_a = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _a === void 0 ? void 0 : _a.click();
            });
            (_g = this._SfRoleTabContainer.querySelector('#consumer-tab-viewer')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', async () => {
                var _a;
                this.myRole = this.TAB_VIEWER;
                this.renderRoleTabs();
                // this.proceedToCalendar();
                (_a = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _a === void 0 ? void 0 : _a.click();
            });
        };
        this.csvmaker = (data) => {
            // Empty array for storing the values
            let csvRows = [];
            // Headers is basically a keys of an
            // object which is id, name, and
            // profession
            const headers = Object.keys(data);
            // As for making csv format, headers 
            // must be separated by comma and
            // pushing it into array
            csvRows.push(headers.join(','));
            // Pushing Object values into array
            // with comma separation
            const values = Object.values(data).join(',');
            csvRows.push(values);
            // Returning the array joining with new line 
            return csvRows.join('\n');
        };
        this.renderChartSettingsFilters = (container, ctx) => {
            //console.log(container);
            var _a, _b;
            var html = `
    
      <div class="m-10" part="filters-container">
        <div class="d-flex justify-end">
          <button id="chart-control-cancel" class="material-icons" part="button-icon-small">close</button>
        </div>
        <div class="d-flex justify-center align-end flex-wrap">
          <sf-i-form id="input-multi-entry-tags" name="Tags" label="Select Tags" apiId="${this.apiIdTags}" mode="multiselect-dropdown" searchPhrase="${this.projectName}" selectProjection="name" mandatory></sf-i-form>
          <button id="chart-control-plot" part="button" class="ml-20">Plot</button>          
        </div>
      </div>
    
    `;
            container.innerHTML = html;
            (_a = container.querySelector('#chart-control-plot')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                var _a;
                const query = container.querySelector('#input-multi-entry-tags').selectedValues();
                this.filterTags = query;
                let eventContainer = null;
                if (this.getCurrentTab() == this.TAB_STREAM) {
                    eventContainer = this._SfStreamContainer;
                }
                if (this.getCurrentTab() == this.TAB_UPCOMING) {
                    eventContainer = this._SfUpcomingContainer;
                }
                if (this.getCurrentTab() == this.TAB_THIS) {
                    eventContainer = this._SfThisContainer;
                }
                if (this.getCurrentTab() == this.TAB_PAST) {
                    eventContainer = this._SfPastContainer;
                }
                if (this.getCurrentTab() == this.TAB_CUSTOM) {
                    eventContainer = this._SfCustomContainer;
                }
                const divs = eventContainer.querySelectorAll('.stream-events-container');
                const tables = eventContainer.querySelectorAll('.stream-events-container-table');
                const hiddenTitles = eventContainer.querySelectorAll('.hidden-title');
                const hiddenFilternames = eventContainer.querySelectorAll('.hidden-filtername');
                const filternames = eventContainer.querySelectorAll('.filtername');
                const streamEventSummary = eventContainer.querySelector('#stream-event-summary');
                if (this.filterTags.length > 0) {
                    streamEventSummary.style.display = 'none';
                }
                else {
                    streamEventSummary.style.display = 'block';
                }
                //console.log('divs', divs);
                for (var i = 0; i < divs.length; i++) {
                    var found = false;
                    var filterMatched = "";
                    const tagsEmbedded = JSON.parse(((_a = divs[i].querySelector('.hidden-tags')) === null || _a === void 0 ? void 0 : _a.innerHTML) + "");
                    //console.log(tagsEmbedded);
                    for (var count1 = 0; count1 < tagsEmbedded.length; count1++) {
                        for (var count2 = 0; count2 < this.filterTags.length; count2++) {
                            if (tagsEmbedded[count1].toLowerCase().indexOf(this.filterTags[count2].toLowerCase()) >= 0) {
                                found = true;
                                filterMatched += (this.filterTags[count2].split(';')[0] + ", ");
                            }
                        }
                    }
                    if (!found) {
                        tables[i].style.display = 'none';
                        hiddenTitles[i].style.display = 'block';
                        hiddenFilternames[i].style.display = 'none';
                        filternames[i].innerHTML = '';
                    }
                    else {
                        tables[i].style.display = 'block';
                        hiddenTitles[i].style.display = 'none';
                        hiddenFilternames[i].style.display = 'block';
                        filternames[i].innerHTML = filterMatched.replace(/,\s*$/, "");
                        ;
                    }
                }
                this.filterEventsInWindow(query, ctx, eventContainer);
            });
            (_b = container.querySelector('#chart-control-cancel')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                container.innerHTML = '';
                container.dispatchEvent(new CustomEvent('canceled', { bubbles: true }));
            });
        };
        this.renderChartSettingsSettings = (container) => {
            var _a, _b, _c, _f;
            var html = `
    
      <div class="m-10" part="settings-container">
        <div class="d-flex justify-end">
          <button id="chart-control-cancel" class="material-icons" part="button-icon-small">close</button>
        </div>

        <div class="d-flex justify-center">
          <div class="p-10 mr-10 w-100">
            <div part="td-head">Reports</div>
            <div part="td-body" class="d-flex align-center mt-10 flex-wrap">
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked name="radio-report" part="radio-download"/>
                <label for="radio-csv" part="label-radio-download" class="mr-10">Summary (CSV)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-image" class="switch-image" value="Image" name="radio-report" part="radio-download"/>
                <label for="radio-image" part="label-radio-download" class="mr-10">Image (PNG)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-stats" class="switch-image" value="Stats" name="radio-report" part="radio-download"/>
                <label for="radio-stats" part="label-radio-download" class="mr-10">Stats (HTML)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-list" class="switch-image" value="List" name="radio-report" part="radio-download"/>
                <label for="radio-list" part="label-radio-download" class="mr-10">List (HTML)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-list-csv" class="switch-image" value="List" name="radio-report" part="radio-download"/>
                <label for="radio-list-csv" part="label-radio-download" class="mr-10">List (CSV)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-consolidated" class="switch-image" value="Consolidated" name="radio-report" part="radio-download"/>
                <label for="radio-consolidated" part="label-radio-download" class="mr-10">Consolidated (HTML)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-certificate" class="switch-image" value="Certificate" name="radio-report" part="radio-download"/>
                <label for="radio-certificate" part="label-radio-download" class="mr-10">Certificate (HTML)</label>
              </div>
            </div>
            <div class="d-flex mt-10">
              <button id="button-download-stats" part="button" class="mt-5 ml-10">Download</button>
            </div>
          </div>
          <!-- <div class="p-10 ml-10 mr-10">
            <div part="td-head">Compliances</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked part="radio-download"/>
              <label for="radio-html" part="label-radio-download">Html</label>
            </div>
            <div class="d-flex">
              <button id="button-download-compliances" part="button" class="mt-5">Download</button>
            </div>
          </div>
          <div class="p-10 ml-10">
            <div part="td-head">Certificate</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-html" class="switch-html" value="Html" checked part="radio-download"/>
              <label for="radio-html" part="label-radio-download">Html</label>
            </div>
            <div class="d-flex">
              <button id="button-download-certificate" part="button" class="mt-5">Download</button>
            </div>
          </div> -->
        </div>
      </div>
    
    `;
            container.innerHTML = html;
            (_a = container.querySelector('#chart-control-cancel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                container.innerHTML = '';
                container.dispatchEvent(new CustomEvent('canceled', { bubbles: true }));
            });
            (_b = container.querySelector('#button-download-stats')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                const radioCsv = container.querySelector('#radio-csv');
                const radioImage = container.querySelector('#radio-image');
                const radioStats = container.querySelector('#radio-stats');
                const radioList = container.querySelector('#radio-list');
                const radioListCsv = container.querySelector('#radio-list-csv');
                const radioConsolidated = container.querySelector('#radio-consolidated');
                const radioCertificate = container.querySelector('#radio-certificate');
                //console.log('radiocsv checked', radioCsv.checked);
                //console.log('radioimage checked', radioImage.checked);
                if (radioCsv.checked) {
                    const blob2 = new Blob([this.csvGraphStats], { type: 'text/csv' });
                    const url2 = window.URL.createObjectURL(blob2);
                    const a2 = document.createElement('a');
                    a2.setAttribute('href', url2);
                    a2.setAttribute('download', 'download_' + new Date() + '.csv');
                    a2.click();
                }
                if (radioImage.checked) {
                    const a = document.createElement('a');
                    a.setAttribute('href', this.chart.toBase64Image());
                    a.setAttribute('download', 'download_' + new Date().getTime() + '.png');
                    a.click();
                    if (this.chart2 != null) {
                        const a2 = document.createElement('a');
                        a2.setAttribute('href', this.chart2.toBase64Image());
                        a2.setAttribute('download', 'download_completeness_' + new Date().getTime() + '.png');
                        a2.click();
                    }
                    if (this.chart3 != null) {
                        const a3 = document.createElement('a');
                        a3.setAttribute('href', this.chart3.toBase64Image());
                        a3.setAttribute('download', 'download_timeliness_' + new Date().getTime() + '.png');
                        a3.click();
                    }
                }
                if (radioStats.checked) {
                    const ts = new Date().getTime();
                    var html = this.COMPLIANCES_HTML;
                    html = html.replace(/PROJECT_NAME/g, this.projectName);
                    html = html.replace(/REPORT_DATE/g, new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' for the period ' + this.period);
                    let tempHtml = "";
                    tempHtml += this.htmlDataStats;
                    if (this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS || this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) {
                    }
                    else {
                        tempHtml += ('<br />' + (this.csvGraphStats.length > 0 ? this.csvToHtmlTable(this.csvGraphStats) : ""));
                        tempHtml += ('<br />' + (this.csvToHtmlTable(this.csvCompletenessStats) + '<br />' + this.csvToHtmlTable(this.csvTimelinessStats) + '<br />' + this.csvToHtmlTable(this.csvComplianceStats)));
                    }
                    html = html.replace(/PERSON_COMPLIANCES/g, tempHtml);
                    const blob = new Blob([html], { type: 'text/html' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'report_' + ts + '.html');
                    a.click();
                }
                if (radioList.checked) {
                    const ts = new Date();
                    var html = this.COMPLIANCES_HTML;
                    html = html.replace(/PROJECT_NAME/g, this.projectName);
                    html = html.replace(/REPORT_DATE/g, new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' for the period ' + this.period);
                    let tempHtml = "";
                    tempHtml += this.getFilteredString();
                    html = html.replace(/PERSON_COMPLIANCES/g, tempHtml);
                    const blob = new Blob([html], { type: 'text/html' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'report_' + ts + '.html');
                    a.click();
                }
                if (radioListCsv.checked) {
                    const ts = new Date();
                    console.log(this.csvDataCompliances);
                    const blob = new Blob([this.csvDataCompliances], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'report_' + ts + '.csv');
                    a.click();
                }
                if (radioConsolidated.checked) {
                    const ts = new Date().getTime();
                    var html = this.COMPLIANCES_HTML;
                    html = html.replace(/PROJECT_NAME/g, this.projectName);
                    html = html.replace(/REPORT_DATE/g, new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' for the period ' + this.period);
                    let tempHtml = "";
                    tempHtml += this.htmlDataStats;
                    if (this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS || this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) {
                    }
                    else {
                        tempHtml += ('<br />' + (this.csvGraphStats.length > 0 ? this.csvToHtmlTable(this.csvGraphStats) : ""));
                        tempHtml += ('<br />' + (this.csvToHtmlTable(this.csvCompletenessStats) + '<br />' + this.csvToHtmlTable(this.csvTimelinessStats) + '<br />' + this.csvToHtmlTable(this.csvComplianceStats)));
                    }
                    tempHtml += this.getFilteredString();
                    html = html.replace(/PERSON_COMPLIANCES/g, tempHtml);
                    const blob = new Blob([html], { type: 'text/html' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'report_' + ts + '.html');
                    a.click();
                }
                if (radioCertificate.checked) {
                    var html = this.CERTIFICATE_HTML;
                    html = html.replace(/PERSON_NAME/g, this.userName);
                    html = html.replace(/PERSON_DESIGNATION/g, this.myRole);
                    html = html.replace(/PERSON_COMPANY/g, this.projectName);
                    html = html.replace(/PERSON_DATE/g, new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear());
                    let tempHtml = "";
                    tempHtml += this.htmlDataStats;
                    if (this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS || this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) {
                    }
                    else {
                        tempHtml += ('<br />' + (this.csvGraphStats.length > 0 ? this.csvToHtmlTable(this.csvGraphStats) : ""));
                        tempHtml += ('<br />' + (this.csvToHtmlTable(this.csvCompletenessStats) + '<br />' + this.csvToHtmlTable(this.csvTimelinessStats) + '<br />' + this.csvToHtmlTable(this.csvComplianceStats)));
                    }
                    html = html.replace(/PERSON_COMPLIANCE_STATUS/g, tempHtml);
                    html = html.replace(/PERSON_COMPLIANCES/g, this.getFilteredString());
                    html = html.replace(/PERSON_PERIOD/g, this.period);
                    //console.log('downloaded certificate');
                    const blob = new Blob([html], { type: 'text/html' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'certificate.html');
                    a.click();
                }
            });
            (_c = container.querySelector('.switch-solid')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                this.fill = "solid";
                if (this.getCurrentTab() == this.TAB_STREAM) {
                    this.renderStream();
                }
            });
            (_f = container.querySelector('.switch-pattern')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
                this.fill = "pattern";
                if (this.getCurrentTab() == this.TAB_STREAM) {
                    this.renderStream();
                }
            });
        };
        this.renderChartSettings = (container, selectedTab = -1, ctx) => {
            var _a;
            var html = '';
            html += '<div class="d-flex justify-end align-start">';
            if (selectedTab === 0) {
                //html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
            }
            else {
                //html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-not-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
            }
            if (selectedTab === 1) {
                html += '<button class="tab-button" id="chart-control-settings" part="calendar-tab-button-selected" class="mr-10"><span class="material-icons">cloud_download</span></button>';
            }
            else {
                html += '<button class="tab-button" id="chart-control-settings" part="calendar-tab-button-not-selected" class="mr-10"><span class="material-icons">cloud_download</span></button>';
            }
            html += '</div>';
            container.querySelector('#chart-settings-controls').innerHTML = html;
            (_a = container.querySelector('#chart-settings-controls').querySelector('#chart-control-settings')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.renderChartSettings(container, 1, ctx);
            });
            // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters')?.addEventListener('click', () => {
            //   this.renderChartSettings(container, 0, ctx);
            // });
            if (selectedTab === 0) {
                const radioCompleteness = container.querySelector('#radio-completeness');
                radioCompleteness.click();
                this.renderChartSettingsFilters(container.querySelector('#chart-settings'), ctx);
            }
            if (selectedTab === 1) {
                // const radioCompleteness = container.querySelector('#radio-completeness') as HTMLButtonElement;
                // radioCompleteness.click();
                this.renderChartSettingsSettings(container.querySelector('#chart-settings'));
            }
            container.querySelector('#chart-settings').addEventListener('canceled', () => {
                //console.log('canceled');
                if (this.getCurrentTab() == this.TAB_STREAM) {
                    this.renderChartSettings(container, -1, ctx);
                    this.renderStream(this.streamIndex);
                }
                // if(this.getCurrentTab() == this.TAB_UPCOMING) {
                //   this.renderChartSettings(container, -1, ctx);
                //   this.renderUpcoming(this.streamIndex);
                // }
                if (this.getCurrentTab() == this.TAB_THIS) {
                    this.renderChartSettings(container, -1, ctx);
                    this.renderThis(this.streamIndex);
                }
                // if(this.getCurrentTab() == this.TAB_PAST) {
                //   this.renderChartSettings(container, -1, ctx);
                //   this.renderPast(this.streamIndex);
                // }
                if (this.getCurrentTab() == this.TAB_CUSTOM) {
                    this.processDateSelection(container);
                }
            });
            // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel')?.addEventListener('click', () => {
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings') as HTMLButtonElement).style.display = 'flex';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters') as HTMLButtonElement).style.display = 'flex';
            //   (container.querySelector('#chart-settings') as HTMLDivElement).innerHTML = '';
            // });
            // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel')?.addEventListener('click', () => {
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings') as HTMLButtonElement).style.display = 'flex';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters') as HTMLButtonElement).style.display = 'flex';
            //   (container.querySelector('#chart-settings') as HTMLDivElement).innerHTML = '';
            // });
            // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters')?.addEventListener('click', () => {
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel') as HTMLButtonElement).style.display = 'flex';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters') as HTMLButtonElement).style.display = 'none';
            //   (container.querySelector('#chart-settings') as HTMLDivElement).innerHTML = '';
            //   this.renderChartSettingsFilters((container.querySelector('#chart-settings') as HTMLDivElement));
            // })
        };
        this.csvToHtmlTable = (strCsv) => {
            var html = '';
            //console.log('csvToHtmlTable', strCsv);
            var strArr = strCsv.split("\n");
            //console.log('csvToHtmlTable', strArr);
            html += '<br />' + strArr[0].split(',')[0] + '<br /><br />';
            html += '<table>';
            for (var i = 0; i < strArr.length; i++) {
                html += '<tr>';
                if (i === 0) {
                    const strArrArr = strArr[i].split(',');
                    for (var j = 0; j < strArrArr.length; j++) {
                        html += ('<th>' + strArrArr[j] + '</th>');
                    }
                }
                else {
                    const strArrArr = strArr[i].split(',');
                    for (var j = 0; j < strArrArr.length; j++) {
                        html += ('<td class="text-center">' + strArrArr[j] + '</td>');
                    }
                }
                html += '</tr>';
            }
            html += '</table>';
            //console.log('csvToHtmlTable', html);
            return html;
        };
        this.getFilteredString = () => {
            //console.log('selectedfilter', this.selectedFilter);
            var tempDiv = document.createElement('div');
            tempDiv.id = "div-filter-content";
            tempDiv.innerHTML = this.htmlDataCompliances;
            const newArrList = [];
            //console.log('tempDiv', this.htmlDataCompliances);
            const rows = tempDiv.querySelectorAll('tr');
            for (var i = 0; i < rows.length; i++) {
                let cols = rows[i].querySelectorAll('td');
                if (cols.length === 0) {
                    cols = rows[i].querySelectorAll('th');
                }
                if (i === 0) {
                    newArrList.push(rows[i]);
                }
                else {
                    if (cols.length > 0) {
                        if (this.selectedFilter == null) {
                            newArrList.push(rows[i]);
                        }
                        else {
                            if (!this.selectedFilter.selected) {
                                var found = false;
                                for (var j = 0; j < this.selectedFilter.length; j++) {
                                    if (cols[cols.length - 1].innerHTML.toLowerCase().replace(/&amp;/g, '&').indexOf(this.selectedFilter[j].value.toLowerCase().replace(/&amp;/g, '&')) >= 0) {
                                        found = true;
                                    }
                                }
                                if (!found) {
                                    newArrList.push(rows[i]);
                                }
                            }
                            else {
                                //console.log('selected filter', this.selectedFilter, cols[cols.length - 1].innerHTML.toLowerCase(), '*-*', this.selectedFilter.value.toLowerCase());
                                if (cols[cols.length - 1].innerHTML.toLowerCase().replace(/&amp;/g, '&').indexOf(this.selectedFilter.value.toLowerCase().replace(/&amp;/g, '&')) >= 0) {
                                    newArrList.push(rows[i]);
                                }
                            }
                        }
                    }
                }
            }
            //console.log('newarrlist', newArrList);
            let filteredHTML = '';
            if (this.selectedFilter != null) {
                if (this.selectedFilter.selected) {
                    filteredHTML += '<small>Filter (included parameters): ' + this.selectedFilter.value.charAt(0).toUpperCase() + this.selectedFilter.value.slice(1) + '</small>';
                }
                else {
                    let params = "";
                    for (var i = 0; i < this.selectedFilter.length; i++) {
                        params += this.selectedFilter[i].value.charAt(0).toUpperCase() + this.selectedFilter[i].value.slice(1);
                        if (i < (this.selectedFilter.length - 1)) {
                            params += ',';
                        }
                    }
                    filteredHTML += '<small>Filter (excluded parameters): ' + params + '</small>';
                }
            }
            //console.log('newArrList', newArrList);
            filteredHTML += '<br /><br /><div class="table-wrapper"><table>';
            for (var i = 0; i < newArrList.length; i++) {
                //console.log('htmlrender', (newArrList[i] as HTMLTableRowElement).outerHTML);
                filteredHTML += newArrList[i].outerHTML;
            }
            filteredHTML += '</table></div>';
            return filteredHTML;
        };
        this.formatLabel = (str, maxwidth) => {
            const sections = [];
            var words = str.split(" ");
            var temp = "";
            words.forEach(function (item, index) {
                if (temp.length > 0) {
                    var concat = temp + ' ' + item;
                    if (concat.length > maxwidth) {
                        sections.push(temp);
                        temp = "";
                    }
                    else {
                        if (index == (words.length - 1)) {
                            sections.push(concat);
                            return;
                        }
                        else {
                            temp = concat;
                            return;
                        }
                    }
                }
                if (index == (words.length - 1)) {
                    sections.push(item);
                    return;
                }
                if (item.length < maxwidth) {
                    temp = item;
                }
                else {
                    sections.push(item);
                }
            });
            return sections;
        };
        this.renderChart4 = (ctx, type, data, title) => {
            if (this.chart4 != null) {
                this.chart4.destroy();
            }
            this.chart4 = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        onComplete: () => {
                            if (this.chart4 != null) {
                                if (type == 'bar') {
                                    this.chart4.ctx.font = "bold 10pt 'Helvetica Neue'";
                                    this.chart4.ctx.fillStyle = '#000';
                                    this.chart4.ctx.textBaseline = "middle";
                                    this.chart4.ctx.textAlign = "center";
                                    for (var i = 0; i < this.chart4.data.datasets.length; i++) {
                                        const dataset = this.chart4.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                if ((this.chart4.data.labels[j].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                                                    this.chart4.ctx.fillStyle = '#fff';
                                                }
                                                else {
                                                    this.chart4.ctx.fillStyle = '#000';
                                                }
                                                this.chart4.ctx.fillText(dataset.data[j], this.chart4.getDatasetMeta(i).data[j].x - 13, this.chart4.getDatasetMeta(i).data[j].y);
                                            }
                                        }
                                    }
                                }
                                else {
                                    //console.log('onanimation complete', this.chart4, this.chart4.data);
                                    for (var i = 0; i < this.chart4.data.datasets.length; i++) {
                                        const dataset = this.chart4.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                //console.log(this.chart4.getDatasetMeta(i));
                                                //console.log(i + "," + j, this.chart4.getDatasetMeta(i).data[j]);
                                                // var total = this.chart4.getDatasetMeta(i).total;
                                                //console.log('total', total);
                                                var mid_radius = this.chart4.getDatasetMeta(i).data[j].innerRadius + (this.chart4.getDatasetMeta(i).data[j].outerRadius - this.chart4.getDatasetMeta(i).data[j].innerRadius) / 2;
                                                //console.log('mid_radius', mid_radius);
                                                var start_angle = this.chart4.getDatasetMeta(i).data[j].startAngle;
                                                //console.log('start_angle', start_angle);
                                                var end_angle = this.chart4.getDatasetMeta(i).data[j].endAngle;
                                                //console.log('end_angle', end_angle);
                                                var mid_angle = start_angle + (end_angle - start_angle) / 2;
                                                //console.log('mid_angle', mid_angle);
                                                var x = mid_radius * Math.cos(mid_angle);
                                                var y = mid_radius * Math.sin(mid_angle);
                                                this.chart4.ctx.fillStyle = '#fff';
                                                if (i == 3) { // Darker text color for lighter background
                                                    this.chart4.ctx.fillStyle = '#444';
                                                }
                                                // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                                                // var str = "";
                                                // for(var k = 0; k <= dataset.data[j].length; k++) {
                                                //   str += '█';
                                                // }
                                                //console.log('outputting bg', str);
                                                this.chart4.ctx.fillStyle = '#000';
                                                //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                                                //const match = /(?<value>\d+\.?\d*)/;
                                                let fillText = '';
                                                if ((this.chart4.data.labels[j] + "").toLowerCase().replace(/ /g, "-") == this.graphParam) {
                                                    this.chart4.ctx.font = "bold 20pt Courier";
                                                    fillText = dataset.data[j] + '✓';
                                                }
                                                else {
                                                    this.chart4.ctx.font = "bold 15pt Courier";
                                                    fillText = dataset.data[j];
                                                }
                                                this.chart4.ctx.fillStyle = '#fff';
                                                this.chart4.ctx.textBaseline = "middle";
                                                this.chart4.ctx.textAlign = "center";
                                                //console.log('comparing labels', (this.chart4.data.labels[j] + "").toLowerCase().replace(/ /g, "-"), j, this.graphParam, this.chart4.getDatasetMeta(i).data[j]);
                                                this.chart4.ctx.fillText(fillText, this.chart4.getDatasetMeta(i).data[j].x + x, this.chart4.getDatasetMeta(i).data[j].y + y);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false,
                            },
                            stacked: true,
                        },
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: window.innerWidth > window.innerHeight ? window.innerWidth / 170 : window.innerWidth / 40,
                                },
                                callback: (val, _index) => {
                                    // Hide every 2nd tick label
                                    let value = data.labels[val];
                                    //console.log('callback', this.graphParam);
                                    if (this.graphParam.length > 0) {
                                        if ((data.labels[val].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                                        }
                                        else {
                                            value = "";
                                        }
                                    }
                                    else {
                                        if (this.isSelectedLegend(val)) {
                                            return "";
                                        }
                                    }
                                    return value;
                                }
                            },
                            stacked: true,
                        }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom",
                            align: "center",
                            labels: {
                                font: {
                                    size: 10,
                                },
                                boxWidth: 10,
                                boxHeight: 10,
                            },
                            onClick: () => { }
                        },
                        title: {
                            display: true,
                            text: title,
                            font: {
                                size: 16,
                            }
                        },
                    },
                    onClick: (_event = {}, array) => {
                        // if(array == null) return;
                        // if(array[0] == null) return;
                        // const barIndex = array[0].index;
                        // this.clickOnBar(false, 2, barIndex)
                        // this.clickOnPie(true, barIndex)
                        if (array == null)
                            return;
                        if (array[0] == null)
                            return;
                        const pieIndex = array[0].index;
                        this.clickOnPie(false, pieIndex);
                        if (this.chart2 != null && this.chart4 != null) {
                            this.clickOnBar(true, 2, array[0].index);
                        }
                    },
                },
            });
            //console.log('canvas parent node', this.chart4.canvas.parentNode);
            this.chart4.canvas.parentNode.style.height = (parseInt(data.labels.length) * 90 + 40) + 'px';
        };
        this.renderChart3 = (ctx, type, data, title) => {
            if (this.chart3 != null) {
                this.chart3.destroy();
            }
            this.chart3 = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        onComplete: () => {
                            if (this.chart3 != null) {
                                if (type == 'bar') {
                                    this.chart3.ctx.font = "bold 10pt 'Helvetica Neue'";
                                    this.chart3.ctx.fillStyle = '#000';
                                    this.chart3.ctx.textBaseline = "middle";
                                    this.chart3.ctx.textAlign = "center";
                                    for (var i = 0; i < this.chart3.data.datasets.length; i++) {
                                        const dataset = this.chart3.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                if ((this.chart3.data.labels[j].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                                                    this.chart3.ctx.fillStyle = '#fff';
                                                }
                                                else {
                                                    this.chart3.ctx.fillStyle = '#000';
                                                }
                                                this.chart3.ctx.fillText(dataset.data[j], this.chart3.getDatasetMeta(i).data[j].x - 13, this.chart3.getDatasetMeta(i).data[j].y);
                                            }
                                        }
                                    }
                                }
                                else {
                                    //console.log('onanimation complete', this.chart3, this.chart3.data);
                                    for (var i = 0; i < this.chart3.data.datasets.length; i++) {
                                        const dataset = this.chart3.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                //console.log(this.chart3.getDatasetMeta(i));
                                                //console.log(i + "," + j, this.chart3.getDatasetMeta(i).data[j]);
                                                // var total = this.chart3.getDatasetMeta(i).total;
                                                //console.log('total', total);
                                                var mid_radius = this.chart3.getDatasetMeta(i).data[j].innerRadius + (this.chart3.getDatasetMeta(i).data[j].outerRadius - this.chart3.getDatasetMeta(i).data[j].innerRadius) / 2;
                                                //console.log('mid_radius', mid_radius);
                                                var start_angle = this.chart3.getDatasetMeta(i).data[j].startAngle;
                                                //console.log('start_angle', start_angle);
                                                var end_angle = this.chart3.getDatasetMeta(i).data[j].endAngle;
                                                //console.log('end_angle', end_angle);
                                                var mid_angle = start_angle + (end_angle - start_angle) / 2;
                                                //console.log('mid_angle', mid_angle);
                                                var x = mid_radius * Math.cos(mid_angle);
                                                var y = mid_radius * Math.sin(mid_angle);
                                                this.chart3.ctx.fillStyle = '#fff';
                                                if (i == 3) { // Darker text color for lighter background
                                                    this.chart3.ctx.fillStyle = '#444';
                                                }
                                                // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                                                // var str = "";
                                                // for(var k = 0; k <= dataset.data[j].length; k++) {
                                                //   str += '█';
                                                // }
                                                //console.log('outputting bg', str);
                                                this.chart3.ctx.fillStyle = '#000';
                                                //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                                                //const match = /(?<value>\d+\.?\d*)/;
                                                let fillText = '';
                                                if ((this.chart3.data.labels[j] + "").toLowerCase().replace(/ /g, "-") == this.graphParam) {
                                                    this.chart3.ctx.font = "bold 20pt Courier";
                                                    fillText = dataset.data[j] + '✓';
                                                }
                                                else {
                                                    this.chart3.ctx.font = "bold 15pt Courier";
                                                    fillText = dataset.data[j];
                                                }
                                                this.chart3.ctx.fillStyle = '#fff';
                                                this.chart3.ctx.textBaseline = "middle";
                                                this.chart3.ctx.textAlign = "center";
                                                //console.log('comparing labels', (this.chart3.data.labels[j] + "").toLowerCase().replace(/ /g, "-"), j, this.graphParam, this.chart3.getDatasetMeta(i).data[j]);
                                                this.chart3.ctx.fillText(fillText, this.chart3.getDatasetMeta(i).data[j].x + x, this.chart3.getDatasetMeta(i).data[j].y + y);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false,
                            },
                            stacked: true,
                        },
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: window.innerWidth > window.innerHeight ? window.innerWidth / 170 : window.innerWidth / 40,
                                },
                                callback: (val, _index) => {
                                    // Hide every 2nd tick label
                                    let value = data.labels[val];
                                    //console.log('callback', this.graphParam);
                                    if (this.graphParam.length > 0) {
                                        if ((data.labels[val].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                                        }
                                        else {
                                            value = "";
                                        }
                                    }
                                    else {
                                        if (this.isSelectedLegend(val)) {
                                            return "";
                                        }
                                    }
                                    return value;
                                }
                            },
                            stacked: true,
                        }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom",
                            align: "center",
                            labels: {
                                font: {
                                    size: 10,
                                },
                                boxWidth: 10,
                                boxHeight: 10,
                            },
                            onClick: () => { }
                        },
                        title: {
                            display: true,
                            text: title,
                            font: {
                                size: 16,
                            }
                        },
                    },
                    onClick: (_event = {}, array) => {
                        // if(array == null) return;
                        // if(array[0] == null) return;
                        // const barIndex = array[0].index;
                        // this.clickOnBar(false, 2, barIndex)
                        // this.clickOnPie(true, barIndex)
                        if (array == null)
                            return;
                        if (array[0] == null)
                            return;
                        const pieIndex = array[0].index;
                        this.clickOnPie(false, pieIndex);
                        if (this.chart2 != null && this.chart3 != null) {
                            this.clickOnBar(true, 2, array[0].index);
                        }
                    },
                },
            });
            //console.log('canvas parent node', this.chart3.canvas.parentNode);
            this.chart3.canvas.parentNode.style.height = (parseInt(data.labels.length) * 90 + 40) + 'px';
        };
        this.renderChart2 = (ctx, type, data, title) => {
            if (this.chart2 != null) {
                this.chart2.destroy();
            }
            this.chart2 = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        onComplete: () => {
                            if (this.chart2 != null) {
                                if (type == 'bar') {
                                    this.chart2.ctx.font = "bold 10pt 'Helvetica Neue'";
                                    this.chart2.ctx.fillStyle = '#000';
                                    this.chart2.ctx.textBaseline = "middle";
                                    this.chart2.ctx.textAlign = "center";
                                    for (var i = 0; i < this.chart2.data.datasets.length; i++) {
                                        const dataset = this.chart2.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                if ((this.chart2.data.labels[j].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                                                    this.chart2.ctx.fillStyle = '#fff';
                                                }
                                                else {
                                                    this.chart2.ctx.fillStyle = '#000';
                                                }
                                                this.chart2.ctx.fillText(dataset.data[j], this.chart2.getDatasetMeta(i).data[j].x - 13, this.chart2.getDatasetMeta(i).data[j].y);
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (var i = 0; i < this.chart2.data.datasets.length; i++) {
                                        const dataset = this.chart2.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                var mid_radius = this.chart2.getDatasetMeta(i).data[j].innerRadius + (this.chart2.getDatasetMeta(i).data[j].outerRadius - this.chart2.getDatasetMeta(i).data[j].innerRadius) / 2;
                                                var start_angle = this.chart2.getDatasetMeta(i).data[j].startAngle;
                                                var end_angle = this.chart2.getDatasetMeta(i).data[j].endAngle;
                                                var mid_angle = start_angle + (end_angle - start_angle) / 2;
                                                var x = mid_radius * Math.cos(mid_angle);
                                                var y = mid_radius * Math.sin(mid_angle);
                                                this.chart2.ctx.fillStyle = '#fff';
                                                if (i == 3) { // Darker text color for lighter background
                                                    this.chart2.ctx.fillStyle = '#444';
                                                }
                                                // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                                                // var str;
                                                // str = "";
                                                // for(var k = 0; k <= dataset.data[j].length; k++) {
                                                //   str += '█';
                                                // }
                                                this.chart2.ctx.fillStyle = '#000';
                                                //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                                                //const match = /(?<value>\d+\.?\d*)/;
                                                let fillText = '';
                                                if ((this.chart2.data.labels[j] + "").toLowerCase().replace(/ /g, "-") == this.graphParam) {
                                                    this.chart2.ctx.font = "bold 20pt Courier";
                                                    fillText = dataset.data[j] + '✓';
                                                }
                                                else {
                                                    this.chart2.ctx.font = "bold 15pt Courier";
                                                    fillText = dataset.data[j];
                                                }
                                                this.chart2.ctx.fillStyle = '#fff';
                                                this.chart2.ctx.textBaseline = "middle";
                                                this.chart2.ctx.textAlign = "center";
                                                this.chart2.ctx.fillText(fillText, this.chart2.getDatasetMeta(i).data[j].x + x, this.chart2.getDatasetMeta(i).data[j].y + y);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false,
                            },
                            stacked: true,
                        },
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: window.innerWidth > window.innerHeight ? window.innerWidth / 170 : window.innerWidth / 40,
                                },
                                callback: (val, _index) => {
                                    // Hide every 2nd tick label
                                    let value = data.labels[val];
                                    //console.log('callback', this.graphParam);
                                    if (this.graphParam.length > 0) {
                                        if ((data.labels[val].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                                        }
                                        else {
                                            value = "";
                                        }
                                    }
                                    else {
                                        if (this.isSelectedLegend(val)) {
                                            return "";
                                        }
                                    }
                                    return value;
                                }
                            },
                            stacked: true,
                        }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom",
                            align: "center",
                            labels: {
                                font: {
                                    size: 10,
                                },
                                boxWidth: 10,
                                boxHeight: 10,
                            },
                            onClick: () => { }
                        },
                        title: {
                            display: true,
                            text: title,
                            font: {
                                size: 16,
                            }
                        }
                    },
                    onClick: (_event = {}, array) => {
                        // if(array == null) return;
                        // if(array[0] == null) return;
                        // const barIndex = array[0].index;
                        // this.clickOnBar(false, 2, barIndex)
                        // this.clickOnPie(true, barIndex)
                        if (array == null)
                            return;
                        if (array[0] == null)
                            return;
                        const pieIndex = array[0].index;
                        // const tempGraphParam = this.graphParam
                        //console.log('pie bar trigger 0', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
                        this.clickOnPie(false, pieIndex);
                        //console.log('pie bar trigger 1', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
                        if (this.chart2 != null && this.chart3 != null) {
                            //console.log('pie bar trigger 2', this.graphParam, array[0].index);
                            this.clickOnBar(true, 2, array[0].index);
                        }
                    },
                },
            });
            //console.log('canvas parent node', this.chart2.canvas.parentNode);
            this.chart2.canvas.parentNode.style.height = (parseInt(data.labels.length) * 90 + 40) + 'px';
        };
        this.renderChart = (ctx, type, data, title) => {
            //console.log('rendering chart', this.chart);
            if (this.chart != null) {
                //console.log('destroying chart', this.chart);
                this.chart.destroy();
                this.chart = null;
            }
            this.chart = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        onComplete: () => {
                            if (this.chart != null) {
                                if (type == 'bar') {
                                    this.chart.ctx.font = "bold 10pt Courier";
                                    this.chart.ctx.fillStyle = '#fff';
                                    this.chart.ctx.textBaseline = "middle";
                                    this.chart.ctx.textAlign = "center";
                                    for (var i = 0; i < this.chart.data.datasets.length; i++) {
                                        const dataset = this.chart.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                //console.log('points', this.chart.getDatasetMeta(i).data[j]);
                                                this.chart.ctx.fillText(dataset.data[j], this.chart.getDatasetMeta(i).data[j].x - 20, this.chart.getDatasetMeta(i).data[j].y);
                                            }
                                        }
                                    }
                                }
                                else {
                                    //console.log('onanimation complete', this.chart, this.chart.data, this.graphParam);
                                    //console.log('onanimation complete', this.graphParam);
                                    var rendered = false;
                                    for (var i = 0; i < this.chart.data.datasets.length; i++) {
                                        const dataset = this.chart.data.datasets[i];
                                        for (var j = 0; j < dataset.data.length; j++) {
                                            if (parseInt(dataset.data[j]) > 0) {
                                                rendered = true;
                                                //console.log(this.chart.getDatasetMeta(i));
                                                //console.log(i + "," + j, this.chart.getDatasetMeta(i).data[j]);
                                                // var total = this.chart.getDatasetMeta(i).total;
                                                //console.log('total', total);
                                                var mid_radius = this.chart.getDatasetMeta(i).data[j].innerRadius + (this.chart.getDatasetMeta(i).data[j].outerRadius - this.chart.getDatasetMeta(i).data[j].innerRadius) / 2;
                                                //console.log('mid_radius', mid_radius);
                                                var start_angle = this.chart.getDatasetMeta(i).data[j].startAngle;
                                                //console.log('start_angle', start_angle);
                                                var end_angle = this.chart.getDatasetMeta(i).data[j].endAngle;
                                                //console.log('end_angle', end_angle);
                                                var mid_angle = start_angle + (end_angle - start_angle) / 2;
                                                //console.log('mid_angle', mid_angle);
                                                var x = mid_radius * Math.cos(mid_angle);
                                                var y = mid_radius * Math.sin(mid_angle);
                                                this.chart.ctx.fillStyle = '#fff';
                                                if (i == 3) { // Darker text color for lighter background
                                                    this.chart.ctx.fillStyle = '#444';
                                                }
                                                // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                                                // var str = "";
                                                // for(var k = 0; k <= dataset.data[j].length; k++) {
                                                //   str += '█';
                                                // }
                                                //console.log('outputting bg', str);
                                                this.chart.ctx.fillStyle = '#000';
                                                //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                                                //const match = /(?<value>\d+\.?\d*)/;
                                                let fillText = '';
                                                let replaceText = ' ';
                                                if (this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
                                                    replaceText = '-';
                                                }
                                                this.chart.ctx.fillStyle = '#fff';
                                                if ((this.chart.data.labels[j] + "").toLowerCase().replace(/ /g, replaceText) == this.graphParam) {
                                                    this.chart.ctx.font = "bold 20pt 'Helvetica Neue'";
                                                    if (this.isSelectedLegend(j)) {
                                                        fillText = '';
                                                    }
                                                    else {
                                                        this.chart.ctx.fillStyle = '#fff';
                                                        fillText = dataset.data[j] + '✓';
                                                    }
                                                }
                                                else {
                                                    this.chart.ctx.font = "bold 12pt 'Helvetica Neue'";
                                                    if (this.isSelectedLegend(j)) {
                                                        fillText = '';
                                                    }
                                                    else {
                                                        this.chart.ctx.fillStyle = '#000';
                                                        fillText = dataset.data[j];
                                                    }
                                                }
                                                this.chart.ctx.textBaseline = "middle";
                                                this.chart.ctx.textAlign = "center";
                                                this.chart.ctx.fillText(fillText, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                                            }
                                        }
                                    }
                                    if (!rendered) {
                                        const { chartArea: { left, top, right, bottom }, ctx } = this.chart;
                                        const centerX = (left + right) / 2;
                                        const centerY = (top + bottom) / 2;
                                        ctx.font = "15pt Arial";
                                        ctx.fillStyle = '#666';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText('No data to display', centerX, centerY);
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false,
                            },
                            stacked: true,
                        },
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: type == 'bar' ? true : false,
                                font: {
                                    size: window.innerWidth > window.innerHeight ? window.innerWidth / 170 : window.innerWidth / 40,
                                }
                            },
                            stacked: true,
                        }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 0.5,
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom",
                            align: "center",
                            labels: {
                                font: {
                                    size: 10,
                                },
                                boxWidth: 10,
                                boxHeight: 10,
                                generateLabels: (chart) => chart.data.labels.map((l, i) => ({
                                    datasetIndex: i,
                                    index: i,
                                    text: l,
                                    fillStyle: chart.data.datasets[0].backgroundColor[i],
                                    strokeStyle: chart.data.datasets[0].backgroundColor[i],
                                    hidden: chart.getDatasetMeta(0).data[i].hidden
                                }))
                            },
                            onClick: (_evt, legendItem, _legend) => {
                                if (this.graphParam.length > 0) {
                                    this.clearSelectedGraphParam();
                                }
                                //
                                //console.log('index clicked', legendItem.index, this.chart.legend.legendItems[legendItem.index]);
                                this.processClickOnLegend(legendItem.index, legendItem);
                            }
                        },
                        title: {
                            display: true,
                            text: title,
                            font: {
                                size: 16,
                            }
                        }
                    },
                    onClick: (_event, array) => {
                        if (array == null)
                            return;
                        if (array[0] == null)
                            return;
                        const pieIndex = array[0].index;
                        // const tempGraphParam = this.graphParam
                        //console.log('pie bar trigger 0', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
                        this.clickOnPie(false, pieIndex);
                        //console.log('pie bar trigger 1', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
                        if (this.chart2 != null && this.chart3 != null) {
                            //console.log('pie bar trigger 2', this.graphParam, array[0].index);
                            this.clickOnBar(true, 2, array[0].index);
                        }
                    }
                },
            });
            this.chart.canvas.parentNode.style.height = '450px';
        };
        this.copy = (aObject) => {
            // Prevent undefined objects
            // if (!aObject) return aObject;
            let bObject = Array.isArray(aObject) ? [] : {};
            let value;
            for (const key in aObject) {
                // Prevent self-references to parent object
                // if (Object.is(aObject[key], aObject)) continue;
                value = aObject[key];
                bObject[key] = (typeof value === "object") ? this.copy(value) : value;
            }
            return bObject;
        };
        this.processGraphHide = (clickedValue, hide) => {
            //console.log('processGraphHide', clickedValue, hide, this.selectedFilter);
            var _a;
            let eventContainer = null;
            if (this.getCurrentTab() == this.TAB_STREAM) {
                eventContainer = this._SfStreamContainer;
            }
            if (this.getCurrentTab() == this.TAB_UPCOMING) {
                eventContainer = this._SfUpcomingContainer;
            }
            if (this.getCurrentTab() == this.TAB_THIS) {
                eventContainer = this._SfThisContainer;
            }
            if (this.getCurrentTab() == this.TAB_PAST) {
                eventContainer = this._SfPastContainer;
            }
            if (this.getCurrentTab() == this.TAB_CUSTOM) {
                eventContainer = this._SfCustomContainer;
            }
            const divs = eventContainer.querySelectorAll('.stream-events-container');
            const eventTitles = eventContainer.querySelectorAll('.stream-events-event-title');
            const eventSubTitles = eventContainer.querySelectorAll('.stream-events-event-subtitle');
            const tables = eventContainer.querySelectorAll('.stream-events-container-table');
            const graphparamnames1 = eventContainer.querySelectorAll('.graphparamname1');
            const graphparamnames2 = eventContainer.querySelectorAll('.graphparamname2');
            const graphparamnames3 = eventContainer.querySelectorAll('.graphparamname3');
            const streamEventSummary = eventContainer.querySelector('#stream-event-summary');
            const streamEventFilters = eventContainer.querySelector('#stream-event-filter');
            if (hide) {
                //this.graphParam = clickedValue;
                streamEventSummary.style.display = 'none';
                //console.log('selectedfilter', this.selectedFilter);
                if (this.selectedFilter == null) {
                    this.selectedFilter = [];
                }
                this.selectedFilter.push({
                    selected: false,
                    value: clickedValue
                });
                var filterString = "";
                for (var j = 0; j < this.selectedFilter.length; j++) {
                    filterString += this.selectedFilter[j].value;
                    if (j < (this.selectedFilter.length - 1)) {
                        filterString += ',';
                    }
                }
                streamEventFilters.style.display = 'block';
                streamEventFilters.innerHTML = '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink d-flex justify-between align-center"><div><span>Filtered by</span>&nbsp;&nbsp;<span id="graph-total" part="badge-filter-name">excluding ' + filterString + '</span></div><button id="button-filter-cancel" part="button-icon"><span class="material-symbols-outlined">close</span></button></div>';
                (_a = streamEventFilters.querySelector('#button-filter-cancel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                    this.clearSelectedLegend();
                    this.clearSelectedGraphParam();
                });
            }
            else {
                streamEventSummary.style.display = 'flex';
                this.selectedFilter = null;
                streamEventFilters.style.display = 'none';
                streamEventFilters.innerHTML = '';
            }
            //console.log('selectedfilter', this.selectedFilter);
            for (var i = 0; i < divs.length; i++) {
                if (!hide) {
                    tables[i].style.display = 'block';
                    //(hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
                    graphparamnames1[i].style.display = 'block';
                    if (graphparamnames2 != null && graphparamnames2[i] != null)
                        graphparamnames2[i].style.display = 'block';
                    if (graphparamnames3 != null && graphparamnames3[i] != null)
                        graphparamnames3[i].style.display = 'block';
                    eventTitles[i].style.display = 'flex';
                    if (eventSubTitles[i] != null) {
                        eventSubTitles[i].style.display = 'flex';
                    }
                }
                else {
                    var found = false;
                    if (this.selectedFilter != null) {
                        for (var j = 0; j < this.selectedFilter.length; j++) {
                            // if((graphparamnames1[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').indexOf(this.selectedFilter[j].value) >= 0) {
                            if (graphparamnames1[i].innerHTML.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') == this.selectedFilter[j].value.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ')) {
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found) {
                        tables[i].style.display = 'none';
                        //(hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
                        graphparamnames1[i].style.display = 'none';
                        if (graphparamnames2 != null && graphparamnames2[i] != null)
                            graphparamnames2[i].style.display = 'none';
                        if (graphparamnames3 != null && graphparamnames3[i] != null)
                            graphparamnames3[i].style.display = 'none';
                        eventTitles[i].style.display = 'none';
                        if (eventSubTitles[i] != null) {
                            eventSubTitles[i].style.display = 'none';
                        }
                    }
                }
                // var found = false;
                // if(this.selectedFilter != null) {
                //   for(var j = 0; j < this.selectedFilter.length; j++) {
                //     if((graphparamnames[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').indexOf(this.selectedFilter[j].value) >= 0) {
                //       found = true;
                //       break;
                //     }
                //   }
                // }
                // if(found) {
                //   if(hide) {
                //     (tables[i] as HTMLDivElement).style.display = 'none';
                //     //(hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
                //     (graphparamnames[i] as HTMLDivElement).style.display = 'none';
                //     (eventTitles[i] as HTMLDivElement).style.display = 'none';  
                //   } else {
                //     (tables[i] as HTMLDivElement).style.display = 'block';
                //     //(hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
                //     (graphparamnames[i] as HTMLDivElement).style.display = 'block';
                //     (eventTitles[i] as HTMLDivElement).style.display = 'flex';
                //   }
                // } 
            }
        };
        this.processGraphFilter = (clickedValue) => {
            var _a;
            let eventContainer = null;
            if (this.getCurrentTab() == this.TAB_STREAM) {
                eventContainer = this._SfStreamContainer;
            }
            // if(this.getCurrentTab() == this.TAB_UPCOMING) {
            //   eventContainer = (this._SfUpcomingContainer as HTMLDivElement);
            // }
            if (this.getCurrentTab() == this.TAB_THIS) {
                eventContainer = this._SfThisContainer;
            }
            // if(this.getCurrentTab() == this.TAB_PAST) {
            //   eventContainer = (this._SfPastContainer as HTMLDivElement);
            // }
            if (this.getCurrentTab() == this.TAB_CUSTOM) {
                eventContainer = this._SfCustomContainer;
            }
            if (this.getCurrentTab() == this.TAB_FIND) {
                eventContainer = this._SfFindContainer;
            }
            if (eventContainer == null)
                return;
            const divs = eventContainer.querySelectorAll('.stream-events-container');
            const eventTitles = eventContainer.querySelectorAll('.stream-events-event-title');
            const eventSubTitles = eventContainer.querySelectorAll('.stream-events-event-subtitle');
            const tables = eventContainer.querySelectorAll('.stream-events-container-table');
            const graphparamnames1 = eventContainer.querySelectorAll('.graphparamname1');
            const graphparamnames2 = eventContainer.querySelectorAll('.graphparamname2');
            const graphparamnames3 = eventContainer.querySelectorAll('.graphparamname3');
            const streamEventSummary = eventContainer.querySelector('#stream-event-summary');
            const streamEventFilters = eventContainer.querySelector('#stream-event-filter');
            if (streamEventSummary == null) {
                return;
            }
            if (this.graphParam == clickedValue) {
                this.graphParam = "";
                streamEventSummary.style.display = 'flex';
                this.selectedFilter = null;
                streamEventFilters.style.display = 'none';
                streamEventFilters.innerHTML = '';
            }
            else {
                this.graphParam = clickedValue;
                streamEventSummary.style.display = 'none';
                this.selectedFilter = {
                    selected: true,
                    value: clickedValue
                };
                streamEventFilters.style.display = 'block';
                streamEventFilters.innerHTML = '<div part="badge-dashboard" class="d-flex align-center justify-between mr-10 mb-10 no-shrink"><div><span>Filtered by</span>&nbsp;&nbsp;<span id="graph-total" part="badge-filter-name">' + clickedValue + '</span></div><button id="button-filter-cancel" part="button-icon"><span class="material-symbols-outlined">close</span></button></div>';
                (_a = streamEventFilters.querySelector('#button-filter-cancel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                    this.clearSelectedGraphParam();
                });
            }
            for (var i = 0; i < divs.length; i++) {
                //console.log('processGraphFilter', graphparamnames1[i], (graphparamnames1[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').replace(/-/g, ' '), this.graphParam.toLowerCase().replace('&amp;', '&').replace(/-/g, ' '));
                if (graphparamnames1[i].innerHTML.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') == this.graphParam.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') || this.graphParam.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') == "") {
                    tables[i].style.display = 'block';
                    //(hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
                    graphparamnames1[i].style.display = 'block';
                    if (graphparamnames2 != null && graphparamnames2[i] != null)
                        graphparamnames2[i].style.display = 'block';
                    if (graphparamnames3 != null && graphparamnames3[i] != null)
                        graphparamnames3[i].style.display = 'block';
                    eventTitles[i].style.display = 'flex';
                    if (eventSubTitles[i] != null) {
                        eventSubTitles[i].style.display = 'flex';
                    }
                }
                else {
                    tables[i].style.display = 'none';
                    //(hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
                    graphparamnames1[i].style.display = 'none';
                    if (graphparamnames2 != null && graphparamnames2[i] != null)
                        graphparamnames2[i].style.display = 'none';
                    if (graphparamnames3 != null && graphparamnames3[i] != null)
                        graphparamnames3[i].style.display = 'none';
                    eventTitles[i].style.display = 'none';
                    if (eventSubTitles[i] != null) {
                        eventSubTitles[i].style.display = 'none';
                    }
                }
            }
        };
        this.processClickOnLegend = (index, legendItem) => {
            legendItem.hidden = true;
            const ci = this.chart;
            if (this.chart.legend.chart.data.datasets != null) {
                this.chart.legend.chart.data.datasets[0].data.forEach((_d, i) => {
                    if (index === i) {
                        let opHide = true;
                        //console.log('dataset-found before before', this.isSelectedLegend(i), legendItem, this.chartSelectedLegend);
                        if (!this.isSelectedLegend(i)) {
                            //this.clearSelectedLegend();
                            opHide = true;
                            this.chart.legend.chart.getDatasetMeta(0).data[index].hidden = true;
                            this.chartSelectedLegend.push(index);
                            ci.update();
                        }
                        else {
                            opHide = false;
                            for (var j = 0; j < this.chartSelectedLegend.length; j++) {
                                this.chart.legend.chart.getDatasetMeta(0).data[this.chartSelectedLegend[j]].hidden = false;
                            }
                            this.removeFromSelectedLegend(index);
                            ci.update();
                        }
                        this.clickOnLegend(this.isSelectedLegend(i), legendItem.text);
                        if (this.chart2 != null && this.chart3 != null) {
                            if (opHide) {
                                // if(this.barCharDataSet2Arr.length > 0) {
                                //   this.chart2.data.datasets = this.barCharDataSet2Arr.pop();
                                // }
                                // if(this.barCharDataSet3Arr.length > 0) {
                                //   this.chart3.data.datasets = this.barCharDataSet3Arr.pop();
                                // }
                                // this.barCharDataSet2Arr.push({index: index, value: this.copy(this.chart2.data.datasets)});
                                // this.barCharDataSet3Arr.push({index: index, value: this.copy(this.chart3.data.datasets)});
                                this.barCharDataSet2Arr.push(this.copy(this.chart2.data.datasets));
                                this.barCharDataSet3Arr.push(this.copy(this.chart3.data.datasets));
                                for (var k = 0; k < this.chart2.data.datasets.length; k++) {
                                    const dataset = this.chart2.data.datasets[k];
                                    for (var j = 0; j < dataset.data.length; j++) {
                                        if (j === index) {
                                            dataset.data[j] = 0;
                                        }
                                        else {
                                        }
                                    }
                                }
                                for (var k = 0; k < this.chart3.data.datasets.length; k++) {
                                    const dataset = this.chart3.data.datasets[k];
                                    for (var j = 0; j < dataset.data.length; j++) {
                                        if (j === index) {
                                            dataset.data[j] = 0;
                                        }
                                        else {
                                        }
                                    }
                                }
                                //console.log('dataset-found before', this.barCharDataSet3Arr);
                            }
                            else {
                                do {
                                    this.chart2.data.datasets = this.barCharDataSet2Arr.pop();
                                    this.chart3.data.datasets = this.barCharDataSet3Arr.pop();
                                } while (this.barCharDataSet2Arr.length > 0);
                                this.chartSelectedLegend = [];
                            }
                            this.chart2.update();
                            this.chart3.update();
                        }
                        ////console.log('modified datasets', this.chart2.data.datasets);
                        //console.log('dataset-found after', this.chartSelectedLegend);
                    }
                });
            }
        };
        this.clickOnLegend = (hide, label) => {
            //console.log(hide, label);
            let labelClicked = '';
            if (this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
                labelClicked = (label).toLowerCase().replace(/ /g, "-").replace('status-', '');
            }
            else {
                labelClicked = (label).toLowerCase();
            }
            this.processGraphHide(labelClicked, hide);
        };
        this.clickOnPie = (callingFromBar, pieIndex) => {
            //console.log('pie bar trigger 1 0', JSON.stringify(this.barCharDataSet2));
            //console.log('pieIndex', pieIndex);
            if (this.barCharDataSet2Arr.length > 0) {
                this.clearSelectedLegend();
            }
            //console.log('pie bar trigger 1 1', JSON.stringify(this.barCharDataSet2));
            let labelClicked = '';
            if (this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
                labelClicked = (this.chart.data.labels[pieIndex] + "").toLowerCase().replace(/ /g, "-").replace('status-', '');
            }
            else {
                labelClicked = (this.chart.data.labels[pieIndex] + "").toLowerCase();
            }
            //console.log('pieIndex', labelClicked);
            if (!callingFromBar) {
                //console.log('pieIndex', labelClicked);
                this.processGraphFilter(labelClicked);
            }
        };
        this.clickOnBar = (callingFromPie, graphNumber, barIndex) => {
            let labelClicked = '';
            if (graphNumber === 2 || graphNumber === 3 || graphNumber === 4) {
                if (this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
                    labelClicked = (this.chart2.data.labels[barIndex].join(" ") + "").toLowerCase().replace(/ /g, "-").replace('status-', '');
                }
                else {
                    labelClicked = (this.chart2.data.labels[barIndex].join(" ") + "").toLowerCase();
                }
            }
            if (!callingFromPie) {
                this.processGraphFilter(labelClicked);
            }
            //console.log('clickonbar trigger', this.graphParam, '><', this.barCharDataSet2);
            if (this.graphParam.length > 0) {
                if (this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
                    this.chart2.data.datasets = this.barCharDataSet2.pop();
                    this.chart3.data.datasets = this.barCharDataSet3.pop();
                    this.chart4.data.datasets = this.barCharDataSet4.pop();
                }
                this.barCharDataSet2.push(this.copy(this.chart2.data.datasets));
                for (var i = 0; i < this.chart2.data.datasets.length; i++) {
                    const dataset = this.chart2.data.datasets[i];
                    for (var j = 0; j < dataset.data.length; j++) {
                        if (j === barIndex) {
                        }
                        else {
                            dataset.data[j] = 0;
                        }
                    }
                }
                this.barCharDataSet3.push(this.copy(this.chart3.data.datasets));
                for (var i = 0; i < this.chart3.data.datasets.length; i++) {
                    const dataset = this.chart3.data.datasets[i];
                    for (var j = 0; j < dataset.data.length; j++) {
                        if (j === barIndex) {
                        }
                        else {
                            dataset.data[j] = 0;
                        }
                    }
                }
                this.barCharDataSet4.push(this.copy(this.chart4.data.datasets));
                for (var i = 0; i < this.chart4.data.datasets.length; i++) {
                    const dataset = this.chart4.data.datasets[i];
                    for (var j = 0; j < dataset.data.length; j++) {
                        if (j === barIndex) {
                        }
                        else {
                            dataset.data[j] = 0;
                        }
                    }
                }
                //console.log('clickonbar trigger latest values', this.chart2.data.datasets);
                //console.log('clickonbar trigger in storage', this.barCharDataSet2);
            }
            else {
                this.chart2.data.datasets = this.barCharDataSet2.pop();
                this.chart3.data.datasets = this.barCharDataSet3.pop();
                this.chart4.data.datasets = this.barCharDataSet4.pop();
            }
            //console.log(this.chart2.data);
            this.chart2.update();
            this.chart3.update();
            this.chart4.update();
        };
        this.getCurrentTab = () => {
            if (this._SfCalendarContainer.style.display == 'flex') {
                return this.TAB_YEAR;
            }
            if (this._SfStreamContainer.style.display == 'flex') {
                return this.TAB_STREAM;
            }
            if (this._SfUpcomingContainer.style.display == 'flex') {
                return this.TAB_UPCOMING;
            }
            if (this._SfThisContainer.style.display == 'flex') {
                return this.TAB_THIS;
            }
            if (this._SfPastContainer.style.display == 'flex') {
                return this.TAB_PAST;
            }
            if (this._SfCustomContainer.style.display == 'flex') {
                return this.TAB_CUSTOM;
            }
            return "";
        };
        this.renderTabs = (selectedTab) => {
            var _a, _b, _c, _f, _g, _h, _k, _l;
            this.selectedTab = selectedTab;
            this.clearAllCalendars();
            this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
            var html = '';
            html += '<button class="tab-button mb-10" id="calendar-tab-month" part="' + (selectedTab == this.TAB_STREAM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Month</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-custom" part="' + (selectedTab == this.TAB_CUSTOM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Range</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-find" part="' + (selectedTab == this.TAB_FIND ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Search</button>';
            html += '<button class="tab-button tab-button-secondary mb-10 ' + (selectedTab == this.TAB_THIS ? '' : 'hide') + '" id="calendar-tab-this" part="' + (selectedTab == this.TAB_THIS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Current</button>';
            html += '<button class="tab-button tab-button-secondary mb-10 ' + (selectedTab == this.TAB_YEAR ? '' : 'hide') + '" id="calendar-tab-year" part="' + (selectedTab == this.TAB_YEAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Overview</button>';
            html += '<button class="tab-button tab-button-secondary mb-10 ' + (selectedTab == this.TAB_ADHOC ? '' : 'hide') + '" id="calendar-tab-adhoc" part="' + (selectedTab == this.TAB_ADHOC ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Adhoc</button>';
            html += '<button class="tab-button tab-button-secondary mb-10 ' + (selectedTab == this.TAB_REGISTERS ? '' : 'hide') + '" id="calendar-tab-register" part="' + (selectedTab == this.TAB_REGISTERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Registers</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-next" part="calendar-tab-button-not-selected"><span class="material-symbols-outlined">arrow_forward_ios</span></button>';
            // html += '<button class="tab-button mb-10" id="calendar-tab-upcoming" part="'+(selectedTab == this.TAB_UPCOMING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Upcoming</button>';
            // html += '<button class="tab-button mb-10" id="calendar-tab-past" part="'+(selectedTab == this.TAB_PAST ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Past</button>';
            this._SfTabContainer.innerHTML = html;
            (_a = this._SfTabContainer.querySelector('#calendar-tab-next')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async (e) => {
                const buttons = this._SfTabContainer.querySelectorAll('.tab-button-secondary');
                buttons.forEach(button => {
                    button.style.display = 'block';
                });
                const button = e.currentTarget;
                button.style.display = 'none';
            });
            (_b = this._SfTabContainer.querySelector('#calendar-tab-year')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                //console.log('calclicked', this.mode);
                if (this.mode == "consumer") {
                    this.renderTabs(this.TAB_YEAR);
                    this.enableCalendar();
                    await this.fetchAndYearlyRenderUserCalendar_2();
                    //this.renderCalendar();
                    // this.loadMode();
                }
                else {
                    this.enableCalendar();
                    this.renderTabs(this.TAB_YEAR);
                }
            });
            (_c = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async () => {
                this.enableStream();
                this.renderTabs(this.TAB_STREAM);
                const currMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
                //console.log('currMonth', currMonth);
                let idx = 0;
                for (var i = 0; i < 12; i++) {
                    //console.log('currMonth compare', currMonth, (parseInt(this.calendarStartMM) + i)%12);
                    if ((parseInt(currMonth) === 12 && (parseInt(this.calendarStartMM) + i) % 12 === 0) || parseInt(currMonth) === (parseInt(this.calendarStartMM) + i) % 12) {
                        idx = i;
                        break;
                    }
                }
                this.currentColumnIndex = idx + "";
                const dateResult = this.calculateStartAndEndDateOfStream(idx);
                if (dateResult != null) {
                    await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
                }
                this.renderStream(idx);
            });
            // (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-upcoming')?.addEventListener('click', async () => {
            //   this.enableUpcoming();
            //   this.renderTabs(this.TAB_UPCOMING);
            //   const dateResult = this.calculateStartAndEndDateOfUpcoming(1);
            //   //console.log('dateresult', dateResult)
            //   this.currentColumnIndex =  1 + ""
            //   await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
            //   this.renderUpcoming();
            // });
            (_f = this._SfTabContainer.querySelector('#calendar-tab-this')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                this.enableThis();
                this.renderTabs(this.TAB_THIS);
                const dateResult = this.calculateStartAndEndDateOfThis(1);
                //console.log('dateresult', dateResult)
                this.currentColumnIndex = 1 + "";
                await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
                this.renderThis();
            });
            // (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-past')?.addEventListener('click', async () => {
            //   this.enablePast();
            //   this.renderTabs(this.TAB_PAST);
            //   const dateResult = this.calculateStartAndEndDateOfPast(1);
            //   //console.log('dateresult', dateResult)
            //   this.currentColumnIndex =  1 + ""
            //   await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
            //   this.renderPast();
            // });
            (_g = this._SfTabContainer.querySelector('#calendar-tab-custom')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
                this.enableCustom();
                this.renderTabs(this.TAB_CUSTOM);
                this.renderCustom();
            });
            (_h = this._SfTabContainer.querySelector('#calendar-tab-find')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', () => {
                this.enableFind();
                this.renderTabs(this.TAB_FIND);
                this.renderFind();
            });
            (_k = this._SfTabContainer.querySelector('#calendar-tab-adhoc')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', () => {
                this.enableAdhoc();
                this.renderTabs(this.TAB_ADHOC);
                this.renderAdhoc();
            });
            (_l = this._SfTabContainer.querySelector('#calendar-tab-register')) === null || _l === void 0 ? void 0 : _l.addEventListener('click', () => {
                this.enableRegisters();
                this.renderTabs(this.TAB_REGISTERS);
                this.renderRegister();
            });
        };
        this.renderMappingTabs = (selectedTab) => {
            var _a, _b;
            var html = '';
            html += '<button class="tab-button" id="mapping-tab-reporter" part="' + (selectedTab == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Reporter</button>';
            html += '<button class="tab-button" id="mapping-tab-approver" part="' + (selectedTab == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Approver</button>';
            this._SfMappingTabContainer.innerHTML = html;
            if (this.myRole == this.TAB_REPORTER) {
                //console.log('sync mapping reporter');
                this._SfButtonBackSyncMapping.style.visibility = 'visible';
            }
            else {
                //console.log('sync mapping approver');
                this._SfButtonBackSyncMapping.style.visibility = 'hidden';
            }
            (_a = this._SfMappingTabContainer.querySelector('#mapping-tab-reporter')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.myRole = this.TAB_REPORTER;
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            });
            (_b = this._SfMappingTabContainer.querySelector('#mapping-tab-approver')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.myRole = this.TAB_APPROVER;
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_APPROVER);
            });
        };
        this.renderExpandEvent = (events, index) => {
            var html = '';
            for (var k = 0; k < Object.keys(events[index]).length; k++) {
                if (!this.getEventPreviewFields().includes(Object.keys(events[index])[k])) {
                    html += '<td part="td-body">';
                    if (events[index][Object.keys(events[index])[k]].indexOf("[") >= 0) {
                        html += this.getEventTexts(Object.keys(events[index])[k], JSON.parse(events[index][Object.keys(events[index])[k]]), events[index]);
                    }
                    else {
                        html += '<sf-i-elastic-text text="' + events[index][Object.keys(events[index])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                    }
                    html += '</td>';
                }
            }
            //console.log((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-'+index)!.innerHTML);
            this._SfMappingContainer.querySelector('#row-unmapped-' + index).insertAdjacentHTML('beforeend', html);
            html = '';
            for (var k = 0; k < Object.keys(events[index]).length; k++) {
                if (!this.getEventPreviewFields().includes(Object.keys(events[index])[k])) {
                    html += '<th part="td-head" class="bg-left">';
                    html += Object.keys(events[index])[k];
                    html += '</th>';
                }
            }
            this._SfMappingContainer.querySelector('#row-unmapped-head-' + index).insertAdjacentHTML('beforeend', html);
            this._SfMappingContainer.querySelector('#th-expand-' + index).style.display = 'none';
            this._SfMappingContainer.querySelector('#td-expand-' + index).style.display = 'none';
        };
        this.renderMapping = (unmappedEvents) => {
            var _a, _b, _c, _f, _g, _h, _k;
            this.mappedValuesDueDates = {};
            this.mappedValuesTags = {};
            this.mappedValuesUsers = {};
            //console.log('rendering mapping1', unmappedEvents, this.mappedValuesDueDates, this.mappedValuesUsers, this.mappedValuesTags)
            var html = '';
            html += '<div class="d-flex align-center mt-20">';
            html += '<div id="row-unmapped-graph" class="d-flex flex-grow"><div class="div-graph-complete"></div><div class="div-graph-pending"></div></div>';
            html += '<div id="row-unmapped-summary" part="filter-title" class="ml-10">Completed 0</div>';
            html += '</div>';
            html += '<table part="stream-event-selected" id="row-unmapped-table-multi-entry" class="hide fixed-bottom justify-center">';
            html += '<tr>';
            html += '</tr>';
            html += '<tr>';
            html += '<th part="td-head" class="col-date">';
            html += 'Duedate';
            html += '</th>';
            html += '<th part="td-head" class="col-tags">';
            html += 'Tags';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Users';
            html += '</th>';
            html += '<th class="d-flex">';
            html += '<button id="row-unmapped-table-multi-entry-cancel" part="button-icon-small" class="material-icons">close</button>';
            html += '</th>';
            html += '</tr>';
            html += '<tr>';
            html += '<td class="col-date">';
            html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-date" />';
            html += '</td>';
            html += '<td part="td-head" class="col-tags">';
            html += '<sf-i-form id="row-unmapped-input-multi-entry-tags" name="Tags" label="Select Tags" apiId="' + this.apiIdTags + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
            //html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-tags"  />';
            html += '</td>';
            html += '<td part="td-head">';
            html += '<sf-i-form id="row-unmapped-input-multi-entry-users" name="Users" label="Select Users" apiId="' + this.apiIdUsers + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
            //html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-users"  />';
            html += '</td>';
            html += '<td>';
            html += '</td>';
            html += '</tr>';
            html += '</table>';
            html += '<div class="d-flex align-center mt-20 mb-20">';
            html += '<div class="mr-10" part="filter-title">Filter</div>';
            html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-all" type="radio"/>All</label></div>';
            html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-mapped" type="radio"/>Mapped</label></div>';
            html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-unmapped" type="radio"/>Un-mapped</label></div>';
            html += '</div>';
            html += '<div class="container-mapping-event">';
            for (var i = 0; i < unmappedEvents.length; i++) {
                // var moveOn = false;
                // if(filter != "all") {
                //   if(filter == "mapped") {
                //     if(this.mappedValuesUsers[i] == null || this.mappedValuesUsers[i] == "") {
                //       moveOn = true;
                //     }
                //   }
                //   if(filter == "unmapped") {
                //     if(this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") {
                //       moveOn = true;
                //     }
                //   }
                // }
                // if(moveOn) {
                //   continue;
                // }
                //console.log(unmappedEvents[i]);
                html += '<table id="row-unmapped-table' + i + '">';
                html += '<thead>';
                html += '<tr id="row-unmapped-head-' + i + '">';
                html += '<th part="td-head" class="left-sticky bg-left">';
                html += 'Select';
                html += '</th>';
                html += '<th part="td-head" class="bg-left ' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'color-done' : 'color-pending') + '">';
                html += 'Status';
                html += '</th>';
                html += '<th part="td-head" class="bg-left col-date-head-' + i + '">';
                html += 'Duedate';
                html += '</th>';
                html += '<th part="td-head" class="bg-left col-tags-head-' + i + '">';
                html += 'Tags';
                html += '</th>';
                html += '<th part="td-head" class="bg-left">';
                html += 'Users';
                html += '</th>';
                for (var k = 0; k < Object.keys(unmappedEvents[i]).length; k++) {
                    if (this.getEventPreviewFields().includes(Object.keys(unmappedEvents[i])[k])) {
                        html += '<th part="td-head" class="bg-left">';
                        html += Object.keys(unmappedEvents[i])[k];
                        html += '</th>';
                    }
                }
                html += '<th id="th-expand-' + i + '" part="td-head">';
                html += '</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';
                html += '<tr id="row-unmapped-' + i + '">';
                html += '<td part="td-body" class="left-sticky">';
                html += '<input type="checkbox" class="input-checkbox" id="row-unmapped-select-' + i + '"/>';
                html += '</td>';
                html += '<td part="td-body" class="" id="row-unmapped-status-' + i + '">';
                html += '<span class="material-icons ' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'color-done' : 'color-pending') + '">' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'check_circle' : 'pending') + '</span>';
                html += '</td>';
                html += '<td part="td-body" class="col-date-' + i + '">';
                html += '<div class="d-flex align-center">';
                html += '<input part="input" type="text" id="row-unmapped-override-date-input-' + i + '" class="hide input-dates" value="' + (this.mappedValuesDueDates[i] != null ? this.mappedValuesDueDates[i] : '') + '"/>';
                html += '<div id="row-unmapped-override-date-div-' + i + '" class="div-dates">' + ((this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : '') + '</div>';
                html += '</div>';
                html += '</td>';
                html += '<td part="td-body" class="col-tags-' + i + '">';
                html += '<sf-i-form id="row-unmapped-input-tags-' + i + '" class="hide input-tags" name="Tags" label="Select Tags" apiId="' + this.apiIdTags + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
                //html += '<input part="input" type="text" id="row-unmapped-input-tags-'+i+'" class="hide input-tags" value="'+((this.mappedValuesTags[i] != null && this.mappedValuesTags[i] != "") ? this.mappedValuesTags[i] : '')+'"/>';
                html += '<div id="row-unmapped-div-tags-' + i + '" class="div-tags">' + ((this.mappedValuesTags[i] != null && this.mappedValuesTags[i] != "") ? this.mappedValuesTags[i] : '') + '</div>';
                html += '</td>';
                html += '<td part="td-body" class="">';
                html += '<sf-i-form id="row-unmapped-input-users-' + i + '" class="hide input-users" name="Users" label="Select Users" apiId="' + this.apiIdUsers + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
                //html += '<input part="input" type="text" id="row-unmapped-input-users-'+i+'" class="hide input-users" value="'+((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? this.mappedValuesUsers[i] : '')+'"/>';
                html += '<div id="row-unmapped-div-users-' + i + '" class="div-users">' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? this.mappedValuesUsers[i] : '') + '</div>';
                html += '</td>';
                for (var k = 0; k < Object.keys(unmappedEvents[i]).length; k++) {
                    if (this.getEventPreviewFields().includes(Object.keys(unmappedEvents[i])[k])) {
                        html += '<td part="td-body">';
                        if (unmappedEvents[i][Object.keys(unmappedEvents[i])[k]].indexOf("[") >= 0) {
                            html += this.getEventTexts(Object.keys(unmappedEvents[i])[k], JSON.parse(unmappedEvents[i][Object.keys(unmappedEvents[i])[k]]), unmappedEvents[i]);
                        }
                        else {
                            html += ' <sf-i-elastic-text text="' + unmappedEvents[i][Object.keys(unmappedEvents[i])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                        }
                        html += '</td>';
                    }
                }
                html += '<td id="td-expand-' + i + '" part="td-body">';
                html += '<button id="button-unmapped-expand-' + i + '" part="button-icon-small" class="material-icons">chevron_right</button>';
                html += '</td>';
                html += '</tr>';
                html += '</tbody>';
                html += '</table>';
            }
            html += '</div>';
            html += '<button id="button-back-add-mapping" part="button" class="invisible mb-20 mt-20">Save</button>';
            this._SfMappingContainer.innerHTML = html;
            for (var i = 0; i < unmappedEvents.length; i++) {
                // var moveOn = false;
                // if(filter != "all") {
                //   if(filter == "mapped") {
                //     if(this.mappedValuesUsers[i] == null || this.mappedValuesUsers[i] == "") {
                //       moveOn = true;
                //     }
                //   }
                //   if(filter == "unmapped") {
                //     if(this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") {
                //       moveOn = true;
                //     }
                //   }
                // }
                // if(moveOn) {
                //   continue;
                // }
                (_a = this._SfMappingContainer.querySelector('#button-unmapped-expand-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const clickIndex = ev.target.id.split("-")[3];
                    //console.log('clickindex', clickIndex)
                    this.renderExpandEvent(unmappedEvents, clickIndex);
                });
                this._SfMappingContainer.querySelector('#row-unmapped-select-' + i).addEventListener('change', (ev) => {
                    const clickIndex = ev.target.id.split("-")[3];
                    //console.log('clickcheckbox', clickIndex)
                    if (this._SfMappingContainer.querySelector('#row-unmapped-select-' + clickIndex).checked) {
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + clickIndex).style.display = 'none';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + clickIndex).style.display = 'block';
                    }
                    if (this.checkAndShowBulk()) {
                        this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry').style.display = 'flex';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry').style.display = 'none';
                    }
                });
                (_b = this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + i)) === null || _b === void 0 ? void 0 : _b.addEventListener('keyup', (ev) => {
                    const clickIndex = ev.target.id.split("-")[5];
                    const div = this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + clickIndex);
                    const input = this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + clickIndex);
                    div.innerHTML = input.value;
                    this.mappedValuesDueDates[clickIndex] = input.value;
                });
                (_c = this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + i)) === null || _c === void 0 ? void 0 : _c.addEventListener('valueChanged', (ev) => {
                    const clickIndex = ev.target.id.split("-")[4];
                    const form = this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + clickIndex);
                    const div = this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + clickIndex);
                    div.innerHTML = '';
                    var html = '';
                    for (var i = 0; i < form.selectedValues().length; i++) {
                        html += form.selectedValues()[i];
                        if (i < (form.selectedValues().length - 1)) {
                            html += ",";
                        }
                    }
                    div.innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this.mappedValuesTags[clickIndex] = form.selectedValues();
                    // const div = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-tags-'+clickIndex) as HTMLDivElement);
                    // const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+clickIndex) as HTMLInputElement);
                    // div.innerHTML = input.value;
                });
                (_f = this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + i)) === null || _f === void 0 ? void 0 : _f.addEventListener('valueChanged', (ev) => {
                    const clickIndex = ev.target.id.split("-")[4];
                    const form = this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + clickIndex);
                    //console.log('valuechanged called', form.selectedValues());
                    const div = this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + clickIndex);
                    div.innerHTML = '';
                    var html = '';
                    for (var i = 0; i < form.selectedValues().length; i++) {
                        html += form.selectedValues()[i];
                        if (i < (form.selectedValues().length - 1)) {
                            html += ",";
                        }
                    }
                    div.innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this.mappedValuesUsers[clickIndex] = form.selectedValues();
                    this.updateMappingStatus(form.selectedValues(), clickIndex);
                    this.calculateAndShowSummary();
                });
            }
            (_g = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-users')) === null || _g === void 0 ? void 0 : _g.addEventListener('valueChanged', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-users');
                //console.log('valuechanged users', input.selectedValues());
                this.updateInAllSelections("users", input.selectedValues());
            });
            (_h = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-date')) === null || _h === void 0 ? void 0 : _h.addEventListener('keyup', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-date');
                this.updateInAllSelections("duedate", input.value);
            });
            (_k = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-tags')) === null || _k === void 0 ? void 0 : _k.addEventListener('valueChanged', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-tags');
                this.updateInAllSelections("tags", input.selectedValues());
            });
            this._SfMappingContainer.querySelector('#row-unmapped-filter-all').addEventListener('change', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-filter-all');
                if (input.checked) {
                    this.showAllEvents();
                }
            });
            this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped').addEventListener('change', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped');
                if (input.checked) {
                    this.showMappedEvents();
                }
            });
            this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped').addEventListener('change', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped');
                if (input.checked) {
                    this.showUnmappedEvents();
                }
            });
            this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry-cancel').addEventListener('click', () => {
                this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry').style.display = 'none';
                this.clearAllMappingSelections();
            });
            this._SfMappingContainer.querySelector('#button-back-add-mapping').addEventListener('click', async () => {
                this.uploadMapping();
            });
        };
        this.applyFilter = (filter = "all") => {
            for (var i = 0; i < this.unmappedEvents.length; i++) {
                if (filter == "mapped") {
                    if (this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'block';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'none';
                    }
                }
                if (filter == "unmapped") {
                    if (this.mappedValuesUsers[i] == null || this.mappedValuesUsers[i] == "") {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'block';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'none';
                    }
                }
                if (filter == "all") {
                    this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'block';
                }
                if (this.myRole == this.TAB_APPROVER) {
                    this._SfMappingContainer.querySelectorAll('.col-date')[0].style.display = 'none';
                    this._SfMappingContainer.querySelectorAll('.col-date')[1].style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-date-' + i).style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-date-head-' + i).style.display = 'none';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[0].style.display = 'none';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[1].style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-tags-' + i).style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-tags-head-' + i).style.display = 'none';
                }
                else {
                    this._SfMappingContainer.querySelectorAll('.col-date')[0].style.display = 'table-cell';
                    this._SfMappingContainer.querySelectorAll('.col-date')[1].style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-date-' + i).style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-date-head-' + i).style.display = 'table-cell';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[0].style.display = 'table-cell';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[1].style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-tags-' + i).style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-tags-head-' + i).style.display = 'table-cell';
                }
            }
            if (filter == "all") {
                this._SfMappingContainer.querySelector('#row-unmapped-filter-all').checked = true;
            }
            if (filter == "mapped") {
                this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped').checked = true;
            }
            if (filter == "unmapped") {
                this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped').checked = true;
            }
        };
        this.getIndexFromId = (id) => {
            for (var i = 0; i < this.unmappedEvents.length; i++) {
                if (this.unmappedEvents[i].id == id) {
                    return i;
                }
            }
            return -1;
        };
        this.prepopulateMapping = (mappings) => {
            //console.log('mappings5', mappings, this.mappedValuesUsers);
            if (mappings == null) {
                return;
            }
            for (var i = 0; i < Object.keys(mappings.duedates).length; i++) {
                const eventId = Object.keys(mappings.duedates)[i];
                const index = this.getIndexFromId(eventId);
                if (index >= 0) {
                    this.mappedValuesDueDates[index] = mappings.duedates[eventId];
                }
            }
            for (var i = 0; i < Object.keys(mappings.tags).length; i++) {
                const eventId = Object.keys(mappings.tags)[i];
                const index = this.getIndexFromId(eventId);
                if (index >= 0) {
                    this.mappedValuesTags[index] = mappings.tags[eventId];
                }
            }
            for (var i = 0; i < Object.keys(mappings.users).length; i++) {
                const eventId = Object.keys(mappings.users)[i];
                const index = this.getIndexFromId(eventId);
                //console.log('mapping users', index);
                if (index >= 0) {
                    this.mappedValuesUsers[index] = mappings.users[eventId];
                }
            }
            //console.log(this.mappedValuesDueDates);
            //console.log(this.mappedValuesTags);
            //console.log(this.mappedValuesUsers);
            for (var i = 0; i < this.unmappedEvents.length; i++) {
                this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + i).innerHTML = (this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : "";
                this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + i).value = (this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : "";
                if (this.mappedValuesTags[i] != null) {
                    var html = '';
                    for (var j = 0; j < this.mappedValuesTags[i].length; j++) {
                        html += this.mappedValuesTags[i][j];
                        if (j < (this.mappedValuesTags[i].length - 1)) {
                            html += ',';
                        }
                    }
                    this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + i).innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + i).preselectedValues = JSON.stringify(this.mappedValuesTags[i]);
                    //((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+i) as SfIForm)!.populatePreselected();
                }
                if (this.mappedValuesUsers[i] != null) {
                    html = '';
                    for (var j = 0; j < this.mappedValuesUsers[i].length; j++) {
                        html += this.mappedValuesUsers[i][j];
                        if (j < (this.mappedValuesUsers[i].length - 1)) {
                            html += ',';
                        }
                    }
                    this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + i).innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + i).preselectedValues = JSON.stringify(this.mappedValuesUsers[i]);
                    //((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+i) as SfIForm)!.populatePreselected();
                }
                if (this.mappedValuesUsers[i] != null) {
                    this._SfMappingContainer.querySelector('#row-unmapped-status-' + i).innerHTML = '<span class="material-icons color-done">check_circle</span>';
                }
                else {
                    this._SfMappingContainer.querySelector('#row-unmapped-status-' + i).innerHTML = '<span class="material-icons color-pending">pending</span>';
                }
            }
            this.calculateAndShowSummary();
        };
        this.clearAllMappingSelections = () => {
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-checkbox');
            for (var i = 0; i < inputArr.length; i++) {
                if (inputArr[i].checked) {
                    inputArr[i].checked = false;
                    inputArr[i].dispatchEvent(new Event('change'));
                }
            }
        };
        this.clearAllCalendars = () => {
            //(this._SfCalendarContainer as HTMLDivElement).innerHTML = "";
            this._SfStreamContainer.innerHTML = "";
            this._SfUpcomingContainer.innerHTML = "";
            this._SfThisContainer.innerHTML = "";
            this._SfPastContainer.innerHTML = "";
            this._SfCustomContainer.innerHTML = "";
            this._SfAdhocContainer.innerHTML = "";
            this._SfRegisterContainer.innerHTML = "";
        };
        this.transformMappingsForUpload = (mapping) => {
            const duedates = mapping.duedates;
            const tags = mapping.tags;
            const users = mapping.users;
            const transformedDuedates = {};
            const transformedTags = {};
            const transformedUsers = {};
            //console.log('unmappedevents[i] duedates',duedates);
            for (var i = 0; i < Object.keys(duedates).length; i++) {
                //console.log('unmappedevents[i]',i,this.unmappedEvents[i]);
                const index = Object.keys(duedates)[i];
                const eventId = this.unmappedEvents[i].id;
                transformedDuedates[eventId] = duedates[index];
            }
            for (var i = 0; i < Object.keys(tags).length; i++) {
                const index = Object.keys(tags)[i];
                const eventId = this.unmappedEvents[i].id;
                transformedTags[eventId] = tags[index];
            }
            for (var i = 0; i < Object.keys(users).length; i++) {
                const index = Object.keys(users)[i];
                const eventId = this.unmappedEvents[i].id;
                transformedUsers[eventId] = users[index];
            }
            return {
                duedates: transformedDuedates,
                tags: transformedTags,
                users: transformedUsers
            };
        };
        this.uploadTriggersMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'triggers');
        };
        this.uploadInternalControlsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'internalcontrols');
        };
        this.uploadAlertSchedulesMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'alertschedules');
        };
        this.uploadActivationsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'activations');
        };
        this.uploadInvalidationsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'invalidations');
        };
        this.uploadDuedatesMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'duedates');
        };
        this.uploadExtensionsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'extensions');
        };
        this.uploadApproversMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'approvers');
        };
        this.uploadFunctionHeadsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'functionheads');
        };
        this.uploadMakerCheckersMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'makercheckers');
        };
        this.uploadDocsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'docs');
        };
        this.uploadAuditorsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'auditors');
        };
        this.uploadViewersMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'viewers');
        };
        this.uploadReportersMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'reporters');
        };
        this.uploadTagsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'tags');
        };
        this.uploadFunctionsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'functions');
        };
        this.uploadLocationsMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'locations');
        };
        this.uploadEntitiesMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'entities');
        };
        this.uploadCountriesMapping = async (data) => {
            await this.uploadOnboardingMapping(data, 'countries');
        };
        this.uploadOnboardingMapping = async (data, onboardingstep) => {
            //console.log('uploading..', data);
            let url = "https://" + this.apiId + "/updatemappedonboarding";
            // const body = { 
            //   "projectid": this.projectId, 
            //   "data": JSON.stringify(data),
            //   "onboardingstep": onboardingstep,
            // }
            let body = {
                "projectid": this.projectId,
                "presigned": true,
                "onboardingstep": onboardingstep
            };
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
                await this.uploadToPresignedUrl(data, jsonRespose.signedUrl);
                body = {
                    "projectid": this.projectId,
                    "key": jsonRespose.key,
                    "onboardingstep": onboardingstep
                };
                authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
                this._SfLoader.innerHTML = '';
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadToPresignedUrl = async (data, url) => {
            const xhr = (await this.prepareXhrPresigned(data, url, this._SfLoader));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
            }
        };
        this.uploadCompliancesMapping = async (data) => {
            //console.log('uploading..', data);
            let url = "https://" + this.apiId + "/updatemappedcompliances";
            let body = {
                "projectid": this.projectId,
                "presigned": true,
            };
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
                await this.uploadToPresignedUrl(data, jsonRespose.signedUrl);
                body = {
                    "projectid": this.projectId,
                    "key": jsonRespose.key
                };
                authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
                this._SfLoader.innerHTML = '';
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadStatutesMapping = async (data) => {
            //console.log('uploading..', data);
            let url = "https://" + this.apiId + "/updatemappedstatutes";
            var searchstring = '';
            for (var i = 0; i < data.mappings.length; i++) {
                const dataItem = JSON.parse(data.mappings[i].data);
                // //console.log(dataItem[3])
                searchstring += dataItem[3];
                if (i < (data.mappings.length - 1)) {
                    searchstring += '|';
                }
            }
            // const body = { 
            //   "projectid": this.projectId, 
            //   "data": JSON.stringify(data),
            //   "compliancessearchstring": searchstring
            // }
            let body = {
                "projectid": this.projectId,
                "presigned": true,
            };
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                await this.uploadToPresignedUrl(data, jsonRespose.signedUrl);
                body = {
                    "projectid": this.projectId,
                    "key": jsonRespose.key,
                    "compliancessearchstring": searchstring
                };
                authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
                this._SfLoader.innerHTML = '';
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadUnTriggerEvent = async (untrigger) => {
            let url = "https://" + this.apiId + "/untriggerevent";
            const body = untrigger;
            console.log('uploading...', body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Trigger retracted successfully!");
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadTriggerMyEvent = async (complianceid, message, countryname, entityname, locationname, statute, subcategory) => {
            let url = "https://" + this.apiId + "/triggermyevent";
            const body = {
                "projectid": this.projectId,
                "complianceid": complianceid,
                "message": message,
                "userid": this.userProfileId,
                "username": this.userName,
                "countryname": countryname,
                "entityname": entityname,
                "locationname": locationname,
                "statute": statute,
                "subcategory": subcategory
            };
            console.log('uploading...', body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Feedback sent successfully!");
                setTimeout(() => {
                    this.clearMessages();
                }, 5000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.uploadTriggerEvent = async (triggeredCompliances) => {
            let url = "https://" + this.apiId + "/triggerevent";
            const body = {
                "projectid": this.projectId,
                "triggers": triggeredCompliances
            };
            console.log('uploading...', body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Triggers deployed successfully!");
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 10000);
            }
        };
        this.uploadAudit = async (entityId, locationId, mmddyyyy, eventid, comments, approved) => {
            let url = "https://" + this.apiId + "/uploadaudit";
            const body = {
                "mmddyyyy": mmddyyyy,
                "projectid": this.projectId,
                "type": "audit",
                "eventid": eventid,
                "comments": comments,
                "approved": approved,
                "entityid": entityId,
                "locationid": locationId,
                "username": this.userName
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                // const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Audit report uploaded successfully!");
                setTimeout(() => {
                    this.clearMessages();
                    // this.showChosenMapping();
                    // this.fetchEventMap();
                    // if(this.myRole == this.TAB_REPORTER) {
                    //   this.renderMappingTabs(this.TAB_REPORTER);
                    // } else {
                    //   this.renderMappingTabs(this.TAB_APPROVER);
                    // }
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadReview = async (entityId, locationId, mmddyyyy, eventid, comments, approved) => {
            let url = "https://" + this.apiId + "/uploadreview";
            const body = {
                "mmddyyyy": mmddyyyy,
                "projectid": this.projectId,
                "type": "review",
                "eventid": eventid,
                "comments": comments,
                "approved": approved,
                "entityid": entityId,
                "locationid": locationId,
                "username": this.userName
            };
            //console.log('uploading review', body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                // const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Report uploaded successfully!");
                setTimeout(() => {
                    this.clearMessages();
                    // this.showChosenMapping();
                    // this.fetchEventMap();
                    // if(this.myRole == this.TAB_REPORTER) {
                    //   this.renderMappingTabs(this.TAB_REPORTER);
                    // } else {
                    //   this.renderMappingTabs(this.TAB_APPROVER);
                    // }
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadReport = async (entityId, locationId, mmddyyyy, eventid, comments, doc, docs, event) => {
            let url = "https://" + this.apiId + "/uploadreport";
            const body = {
                "mmddyyyy": mmddyyyy,
                "projectid": this.projectId,
                "type": "report",
                "eventid": eventid,
                "comments": comments,
                "dateofcompletion": doc,
                "entityid": entityId,
                "locationid": locationId,
                "event": JSON.stringify(event),
                "docs": JSON.stringify(docs),
                "username": this.userName
            };
            //console.log(body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                // const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Report uploaded successfully!");
                setTimeout(() => {
                    this.clearMessages();
                    // this.showChosenMapping();
                    // this.fetchEventMap();
                    // if(this.myRole == this.TAB_REPORTER) {
                    //   this.renderMappingTabs(this.TAB_REPORTER);
                    // } else {
                    //   this.renderMappingTabs(this.TAB_APPROVER);
                    // }
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadMapping = async () => {
            let url = "https://" + this.apiId + "/mapevents";
            const mapping = this.transformMappingsForUpload({
                duedates: this.mappedValuesDueDates,
                tags: this.mappedValuesTags,
                users: this.mappedValuesUsers
            });
            const body = { "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "role": this.myRole, "mapping": JSON.stringify(mapping) };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                // const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Mapping uploaded successfully!");
                setTimeout(() => {
                    this.clearMessages();
                    this.showChosenMapping();
                    this.fetchEventMap();
                    if (this.myRole == this.TAB_REPORTER) {
                        this.renderMappingTabs(this.TAB_REPORTER);
                    }
                    else {
                        this.renderMappingTabs(this.TAB_APPROVER);
                    }
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadEvents = async () => {
            let url = "https://" + this.apiId + "/synccalendar";
            const body = { "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "events": JSON.stringify(this.events) };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                // const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
                // this.loadMode();
                this.showChosenMapping();
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadReprogramTrigger = async (eventid, timestamp) => {
            let url = "https://" + this.apiId + "/reprogramtrigger";
            const body = { "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "eventid": eventid, "timestamp": timestamp + "" };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                // const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.processEvent = (value) => {
            //console.log('processing due date', value);
            //console.log('processing due date', value.duedate.replace(/['"]+/g, ''));
            //console.log('processing due date', this.mappings);
            var duedate = value.duedate;
            if (this.mappings != null && this.mappings.duedates != null && this.mappings.duedates[value.id] != null && this.mappings.duedates[value.id] != "") {
                duedate = this.mappings.duedates[value.id];
            }
            const duedateArr = duedate.replace(/['"]+/g, '').split(",");
            const startMonth = parseInt(this.calendarStartMM);
            for (var i = 0; i < duedateArr.length; i++) {
                const dateArr = duedateArr[i].split("/");
                //console.log('datearr', dateArr);
                if (dateArr[2] == "*") {
                    if (dateArr[1] == "*") {
                        var j = startMonth;
                        while (true) {
                            //console.log('processing event',dateArr[2],dateArr[1],j);
                            const mmdd = ("0" + j).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);
                            if (this.events == null) {
                                this.events = {};
                            }
                            if (this.events[mmdd] == null) {
                                this.events[mmdd] = [];
                            }
                            this.events[mmdd].push(value);
                            if (startMonth !== 12) {
                                if (j === (startMonth - 1)) {
                                    break;
                                }
                            }
                            j++;
                            if (j === 13) {
                                j = 0;
                            }
                        }
                    }
                    else {
                        const mmdd = ("0" + (parseInt(dateArr[1]))).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);
                        if (this.events == null) {
                            this.events = {};
                        }
                        if (this.events[mmdd] == null) {
                            this.events[mmdd] = [];
                        }
                        this.events[mmdd].push(value);
                    }
                }
                else {
                    if ((new Date().getFullYear() + "") == dateArr[2]) {
                        const mmdd = ("0" + (parseInt(dateArr[1]))).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);
                        if (this.events == null) {
                            this.events = {};
                        }
                        if (this.events[mmdd] == null) {
                            this.events[mmdd] = [];
                        }
                        this.events[mmdd].push(value);
                    }
                }
            }
            //console.log('calendar processed', this.calendar);
            //console.log('event processed', this.events);
        };
        this.renderChosenProject = (events = null) => {
            if (events == null) {
                var html = '';
                html += '<div class="lb"></div>';
                html += '<div class="d-flex justify-between align-center">';
                html += '<div class="muted">Calender doesn\'t exist! &nbsp; &nbsp;</div>';
                html += '<button id="button-generate-chosen-project" part="button">Generate</button>';
                html += '</div>';
                html += '<div class="rb"></div>';
                this._SfContainerChosenProject.innerHTML = html;
                this._SfContainerChosenProject.querySelector('#button-generate-chosen-project').addEventListener('click', async () => {
                    await this.fetchList();
                });
            }
            else {
            }
        };
        this.fetchRcmLockedCompliances = async (lockedCompliances) => {
            let url = "https://" + this.apiId + "/getrcmlockedcompliances";
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr({ data: lockedCompliances }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('lockedcompliances', jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchCancelOnboardingJob = async (onboardingStep) => {
            let url = "https://" + this.apiId + "/cancelonboardingjob";
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr({ "projectid": this.projectId, "onboardingstep": onboardingStep }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('fetchCancelnboardingJob', jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchGetStoredMapping = async (flow) => {
            let url = "https://" + this.apiId + "/getstoredmapping";
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr({ "projectid": this.projectId, "flow": flow }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('fetchGetStoredMapping', jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchUpdateUsermap = async (usermap) => {
            let url = "https://" + this.apiIdUsers + "/updatefield";
            this.setSuccess('Updating usermaps, please wait...');
            //console.log('updating usermap', usermap);
            const arrUserIds = Object.keys(usermap);
            for (var i = 0; i < arrUserIds.length; i++) {
                const userId = arrUserIds[i];
                const map = usermap[userId];
                const strMap = JSON.stringify(map).replace(/"/g, '_QUOTES_');
                const body = { id: userId, field: "usermap", value: "\"" + strMap + "\"" };
                //console.log('updating', userId, body, url)
                let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                let xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
                this._SfLoader.innerHTML = '';
                if (xhr.status == 200) {
                }
            }
            setTimeout(() => {
                this.clearMessages();
            }, 1000);
        };
        this.fetchUpdateRcmLock = async (complianceId) => {
            let url = "https://" + this.apiId + "/updatercmlock";
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr({ "complianceid": complianceId, "locked": true }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('fetchUpdateRcmLock', jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDetailProject = async (projectId) => {
            let url = "https://" + this.apiIdProjects + "/detail";
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr({ "id": projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('searchprojects', jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDeleteReview = async (eventId, mmddyyyy, entityId, locationId) => {
            let url = "https://" + this.apiId + "/deletereview";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "entityid": entityId, "locationid": locationId, "mmddyyyy": mmddyyyy, "eventid": eventId, }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchSearchStatutes = async (searchString, cursor = "") => {
            let url = "https://" + this.apiIdStatutes + "/listlarge";
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr({ "searchstring": searchString, "cursor": cursor }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('searchstatutes', jsonRespose);
                let newCursor = jsonRespose.cursor;
                let i = 0;
                while (true) {
                    url = "https://" + this.apiIdStatutes + "/listlarge";
                    authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                    xhr = (await this.prepareXhr({ "searchstring": searchString, "cursor": newCursor }, url, this._SfLoader, authorization, "" + parseInt(((i) * 100 / jsonRespose.found) + "") + "%"));
                    this._SfLoader.innerHTML = '';
                    if (xhr.status == 200) {
                        const jsonRespose1 = JSON.parse(xhr.responseText);
                        //console.log('found', jsonRespose1.values);
                        jsonRespose.values.push(...jsonRespose1.values);
                        if (newCursor == jsonRespose1.cursor) {
                            break;
                        }
                        newCursor = jsonRespose1.cursor;
                        //console.log('newcursor', i, jsonRespose1.cursor);
                        i += jsonRespose1.values.length;
                    }
                    else {
                        break;
                    }
                }
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchSearchCompliances = async (searchString, cursor = "", count, length) => {
            let url = "https://" + this.apiIdCompliances + "/listlarge";
            let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            let xhr = (await this.prepareXhr({ "searchstring": searchString, "cursor": cursor }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                // //console.log(jsonRespose);
                let newCursor = jsonRespose.cursor;
                ////console.log('newcursor', newCursor);
                while (true) {
                    url = "https://" + this.apiIdCompliances + "/listlarge";
                    authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                    xhr = (await this.prepareXhr({ "searchstring": searchString, "cursor": newCursor }, url, this._SfLoader, authorization, "" + parseInt(((count) * 100 / length) + "") + "%"));
                    this._SfLoader.innerHTML = '';
                    if (xhr.status == 200) {
                        const jsonRespose1 = JSON.parse(xhr.responseText);
                        // //console.log('newcursor response', jsonRespose1);
                        jsonRespose.values.push(...jsonRespose1.values);
                        if (newCursor == jsonRespose1.cursor) {
                            break;
                        }
                        newCursor = jsonRespose1.cursor;
                        ////console.log('newcursor', i, jsonRespose1.cursor);
                    }
                    else {
                        break;
                    }
                }
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedProjects = async () => {
            let url = "https://" + this.apiId + "/getmappedprojects";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "complianceid": this.rcmSelectedCompliance.id }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchOnboardingStatus = async () => {
            let url = "https://" + this.apiId + "/getonboardingstatus";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchGetSignOff = async () => {
            let url = "https://" + this.apiId + "/getsignoff";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchUpdateSignOff = async (signoffText, signature) => {
            let url = "https://" + this.apiId + "/updatesignoff";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "signofftext": signoffText, "signature": signature, "username": this.userName }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedCompliances = async () => {
            let url = "https://" + this.apiId + "/getmappedcompliances";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                var jsRespose = JSON.parse(xhr.responseText);
                let resultPresigned = null;
                resultPresigned = {};
                resultPresigned.data = {};
                resultPresigned.data.mappings = await this.fetchPresignedUrl(jsRespose.signedUrlGet);
                console.log(resultPresigned);
                await this.fetchPresignedUrlDelete(jsRespose.signedUrlDelete);
                return resultPresigned;
                // const jsonRespose = JSON.parse(xhr.responseText);
                // return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
            // let jsonResponse : any = null;
            // let lastEvaluatedKey : any = 0;
            // do {
            //   //console.log(lastEvaluatedKey);
            //   let url = "https://"+this.apiId+"/getmappedcompliances";
            //   const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            //   const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "lastevaluatedkey": lastEvaluatedKey}, url, this._SfLoader, authorization)) as any;
            //   this._SfLoader.innerHTML = '';
            //   if(xhr.status == 200) {
            //     const jsRespose = JSON.parse(xhr.responseText);
            //     //console.log(jsRespose);
            //     if(jsRespose == null) return;
            //     if(lastEvaluatedKey === 0) {
            //         jsonResponse = {};
            //         jsonResponse.data = {}
            //         jsonResponse.data = jsRespose.data;
            //     } else {
            //       jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);
            //     }
            //     if(jsRespose.lastEvaluatedKey < 0) break;
            //     lastEvaluatedKey = jsRespose.lastEvaluatedKey;
            //   } else {
            //     const jsonRespose = JSON.parse(xhr.responseText);
            //     this.setError(jsonRespose.error);
            //     break;
            //   }
            // } while(true);
            // return jsonResponse;
        };
        this.fetchMappedSerializedExtensions = async () => {
            return (await this.fetchSerializedMapping("extensions"));
        };
        this.fetchMappedSerializedAlertSchedules = async () => {
            return (await this.fetchSerializedMapping("alertschedules"));
        };
        this.fetchMappedSerializedTriggers = async () => {
            return (await this.fetchSerializedMapping("triggers"));
        };
        this.fetchMappedSerializedDuedates = async () => {
            return (await this.fetchSerializedMapping("duedates"));
        };
        this.fetchMappedSerializedApprovers = async () => {
            return (await this.fetchSerializedMapping("approvers"));
        };
        this.fetchMappedSerializedFunctionheads = async () => {
            return (await this.fetchSerializedMapping("functionheads"));
        };
        this.fetchMappedSerializedMakerCheckers = async () => {
            return (await this.fetchSerializedMapping("makercheckers"));
        };
        this.fetchMappedSerializedDocs = async () => {
            return (await this.fetchSerializedMapping("docs"));
        };
        this.fetchMappedSerializedAuditors = async () => {
            return (await this.fetchSerializedMapping("auditors"));
        };
        this.fetchMappedSerializedViewers = async () => {
            return (await this.fetchSerializedMapping("viewers"));
        };
        this.fetchMappedSerializedReporters = async () => {
            return (await this.fetchSerializedMapping("reporters"));
        };
        this.fetchMappedSerializedTags = async () => {
            return (await this.fetchSerializedMapping("tags"));
        };
        this.fetchMappedSerializedLocations = async () => {
            return (await this.fetchSerializedMapping("locations"));
        };
        this.fetchMappedSerializedFunctions = async () => {
            return (await this.fetchSerializedMapping("functions"));
        };
        this.fetchMappedSerializedEntities = async () => {
            return (await this.fetchSerializedMapping("entities"));
        };
        this.fetchPresignedUrl = async (url) => {
            const xhr = (await this.prepareXhrPresignedGet(url, this._SfLoader, 'Downloading'));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsRespose = JSON.parse(xhr.responseText);
                console.log('jsRespose', jsRespose);
                return jsRespose;
            }
        };
        this.fetchPresignedUrlDelete = async (url) => {
            const xhr = (await this.prepareXhrPresignedDelete(url, this._SfLoader));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsRespose = JSON.parse(xhr.responseText);
                console.log('jsRespose', jsRespose);
                return jsRespose;
            }
        };
        this.fetchSerializedMapping = async (onboardingstep) => {
            const url = "https://" + this.apiId + "/getmappedserializedonboarding";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "onboardingstep": onboardingstep }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                var jsRespose = JSON.parse(xhr.responseText);
                let resultPresigned = null;
                resultPresigned = {};
                resultPresigned.data = {};
                resultPresigned.data.mappings = await this.fetchPresignedUrl(jsRespose.signedUrlGet);
                console.log(resultPresigned);
                await this.fetchPresignedUrlDelete(jsRespose.signedUrlDelete);
                return resultPresigned;
                // if(jsRespose != null && jsRespose.lastEvaluatedKey == null) {
                //   jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);
                //   break;
                // } else {
                //   if(jsonResponse == null) {
                //     jsonResponse = {};
                //     jsonResponse.data = {}
                //     jsonResponse.data = jsRespose.data;
                //   } else {
                //     jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);
                //   }
                //   lastEvaluatedKey = jsRespose.lastEvaluatedKey;
                // }
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchSerializedPartByPart = async (url) => {
            let jsonResponse = null;
            let lastEvaluatedKey = null;
            do {
                //console.log(lastEvaluatedKey);
                const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                const xhr = (await this.prepareXhr({ "projectid": this.projectId, "lastevaluatedkey": lastEvaluatedKey }, url, this._SfLoader, authorization));
                this._SfLoader.innerHTML = '';
                if (xhr.status == 200) {
                    const jsRespose = JSON.parse(xhr.responseText);
                    //console.log(jsRespose);
                    if (jsRespose != null && jsRespose.lastEvaluatedKey == null) {
                        jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);
                        break;
                    }
                    else {
                        if (jsonResponse == null) {
                            jsonResponse = {};
                            jsonResponse.data = {};
                            jsonResponse.data = jsRespose.data;
                        }
                        else {
                            jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);
                        }
                        lastEvaluatedKey = jsRespose.lastEvaluatedKey;
                    }
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            } while (true);
            //console.log(jsonResponse);
            return jsonResponse;
        };
        this.fetchMappedSerializedCountries = async () => {
            // return (await this.fetchSerializedPartByPart("https://"+this.apiId+"/getmappedserializedcountries"));
            return (await this.fetchSerializedMapping("countries"));
        };
        this.fetchMappedTriggers = async () => {
            return (await this.fetchMappedOnboarding('triggers'));
        };
        this.fetchMappedInternalControls = async () => {
            return (await this.fetchMappedOnboarding('internalcontrols'));
        };
        this.fetchMappedAlertSchedules = async () => {
            return (await this.fetchMappedOnboarding('alertschedules'));
        };
        this.fetchMappedActivations = async () => {
            return (await this.fetchMappedOnboarding('activations'));
        };
        this.fetchMappedInvalidations = async () => {
            return (await this.fetchMappedOnboarding('invalidations'));
        };
        this.fetchMappedExtensions = async () => {
            return (await this.fetchMappedOnboarding('extensions'));
        };
        this.fetchMappedDuedates = async () => {
            return (await this.fetchMappedOnboarding('duedates'));
        };
        this.fetchMappedReporters = async () => {
            return (await this.fetchMappedOnboarding('reporters'));
        };
        this.fetchMappedApprovers = async () => {
            return (await this.fetchMappedOnboarding('approvers'));
        };
        this.fetchMappedFunctionHeads = async () => {
            return (await this.fetchMappedOnboarding('functionheads'));
        };
        this.fetchMappedMakerCheckers = async () => {
            return (await this.fetchMappedOnboarding('makercheckers'));
        };
        this.fetchMappedDocs = async () => {
            return (await this.fetchMappedOnboarding('docs'));
        };
        this.fetchMappedAuditors = async () => {
            return (await this.fetchMappedOnboarding('auditors'));
        };
        this.fetchMappedViewers = async () => {
            return (await this.fetchMappedOnboarding('viewers'));
        };
        this.fetchMappedTags = async () => {
            return (await this.fetchMappedOnboarding('tags'));
        };
        this.fetchMappedLocations = async () => {
            return (await this.fetchMappedOnboarding('locations'));
        };
        this.fetchMappedFunctions = async () => {
            return (await this.fetchMappedOnboarding('functions'));
        };
        this.fetchMappedEntities = async () => {
            return (await this.fetchMappedOnboarding('entities'));
        };
        this.fetchMappedCountries = async () => {
            return (await this.fetchMappedOnboarding('countries'));
        };
        this.fetchMappedOnboarding = async (onboardingstep) => {
            const url = "https://" + this.apiId + "/getmappedonboarding";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "onboardingstep": onboardingstep }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                var jsRespose = JSON.parse(xhr.responseText);
                let resultPresigned = null;
                resultPresigned = {};
                resultPresigned.data = {};
                resultPresigned.data.mappings = await this.fetchPresignedUrl(jsRespose.signedUrlGet);
                console.log('resultPresigned', resultPresigned);
                // await this.fetchPresignedUrlDelete(jsRespose.signedUrlDelete)
                return resultPresigned;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchUpdatedCompliances = async (nextBackwardToken = "") => {
            let url = "https://" + this.apiIdCompliances + "/logs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "nextBackwardToken": nextBackwardToken }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedStatutes = async () => {
            let url = "https://" + this.apiId + "/getmappedstatutes";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchCreateRcmJob = async (complianceid, data, triggerDate, triggerMessage, projects) => {
            data.trigger = {};
            data.trigger.date = triggerDate;
            data.trigger.message = triggerMessage;
            data.projects = [];
            data.projects.push(...projects);
            let url = "https://" + this.apiId + "/creatercmjob";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "complianceid": complianceid, "data": data }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchRcmNotifications = async (projectid) => {
            let url = "https://" + this.apiId + "/getrcmnotifications";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": projectid }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchRcmJobs = async (complianceid) => {
            let url = "https://" + this.apiId + "/getrcmjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "complianceid": complianceid }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchInternalControlsJobs = async () => {
            let url = "https://" + this.apiId + "/getinternalcontrolsjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchExtensionsJobs = async () => {
            let url = "https://" + this.apiId + "/getalertschedulesjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchAlertSchedulesJobs = async () => {
            let url = "https://" + this.apiId + "/getalertschedulesjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDueDatesJobs = async () => {
            let url = "https://" + this.apiId + "/getduedatesjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchApproversJobs = async () => {
            let url = "https://" + this.apiId + "/getapproversjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchFunctionHeadsJobs = async () => {
            let url = "https://" + this.apiId + "/getfunctionheadsjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMakerCheckersJobs = async () => {
            let url = "https://" + this.apiId + "/getmakercheckersjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDocsJobs = async () => {
            let url = "https://" + this.apiId + "/getdocsjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchAuditorsJobs = async () => {
            let url = "https://" + this.apiId + "/getauditorsjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchViewersJobs = async () => {
            let url = "https://" + this.apiId + "/getviewersjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchReportersJobs = async () => {
            let url = "https://" + this.apiId + "/getreportersjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchTagsJobs = async () => {
            let url = "https://" + this.apiId + "/gettagsjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchLocationsJobs = async () => {
            let url = "https://" + this.apiId + "/getlocationsjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchCountriesJobs = async () => {
            let url = "https://" + this.apiId + "/getcountriesjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchEntitiesJobs = async () => {
            let url = "https://" + this.apiId + "/getentitiesjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchFunctionJobs = async () => {
            let url = "https://" + this.apiId + "/getfunctionsjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchCalendarJobs = async () => {
            let url = "https://" + this.apiId + "/getcalendarjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDetail = async (value) => {
            const body = this.getApiBodyList();
            body.id = value;
            //console.log('detail', value, body);
            let url = "https://" + this.apiIdDetail + "/" + this.apiMethodDetail;
            //console.log('fetch events detail url', url);
            //console.log('fetch events detail body', body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log('jsonResponse fetch events detail', jsonRespose.data.value.duedate);
                this.processEvent(jsonRespose.data.value);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchGetMappedCalendar = async (year) => {
            // let url = "https://"+this.apiId+"/getmappedcalendar";
            let url = "https://" + this.apiId + "/getcalendar";
            const body = { "projectid": this.projectId, "year": year };
            if (this.contractStartDate != "") {
                body.contractstartdate = this.contractStartDate;
            }
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                return jsonRespose;
            }
        };
        this.sleepFunction = async (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        };
        this.renderAppropriateStream = (startDate, endDate) => {
            if (startDate == "" && endDate == "")
                this.renderCalendar(); // yearly
            if (this.selectedTab == this.TAB_STREAM) {
                this.renderStream(parseInt(this.currentColumnIndex), false);
            }
            // if(this.selectedTab == this.TAB_UPCOMING) {
            //   this.renderUpcoming(parseInt(this.currentColumnIndex), false);
            // }
            if (this.selectedTab == this.TAB_THIS) {
                this.renderThis(parseInt(this.currentColumnIndex), false);
            }
            // if(this.selectedTab == this.TAB_PAST) {
            //   this.renderPast(parseInt(this.currentColumnIndex), false);
            // }
        };
        this.fetchRegisters = async (searchString = "") => {
            let path = "";
            path = "getallfunctionevents";
            let url = "https://" + this.apiId + "/" + path;
            let locationId = "";
            let entityId = "";
            if (this.locationId != null && this.locationId.length > 2) {
                locationId = this.locationId;
            }
            if (this.entityId != null && this.entityId.length > 2) {
                entityId = this.entityId;
            }
            //console.log('fetch calendar url', url);
            let urlBody = { "projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "searchstring": searchString, "locationid": locationId, "entityid": entityId };
            //console.log('urlbody', url, urlBody);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                return jsonRespose.data;
            }
        };
        this.fetchAndYearlyRenderUserCalendar_2 = async (startDate = "", endDate = "", searchString = "") => {
            let path = "", view = "";
            if (this.tagId != null && this.tagId != "") {
                view = "tag";
            }
            else if (this.countryId != null && this.countryId != "") {
                view = "country";
            }
            else if (this.locationId != null && this.locationId != "") {
                view = "location";
            }
            else {
                view = "entity";
            }
            path = "getallcountryevents";
            let sDate = "";
            let eDate = "";
            //console.log('currenttab', this.getCurrentTab());
            if (this.getCurrentTab() == this.TAB_YEAR) {
                sDate = "03/31/" + this.calendarStartYYYY;
                eDate = "04/01/" + (parseInt(this.calendarStartYYYY) + 1);
            }
            else {
                sDate = startDate;
                eDate = endDate;
            }
            let url = "https://" + this.apiId + "/" + path;
            //console.log('fetch calendar url', url);
            let urlBody = { "projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "false", "exclusivestartkey": 0, "sdate": sDate, "edate": eDate, "view": view, "year": this.calendarStartYYYY };
            if (searchString.length > 0) {
                urlBody["searchstring"] = searchString;
            }
            //console.log('urlbody', urlBody);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization, 'Preparing'));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonRespose', jsonRespose);
                this.events = (await this.fetchPresignedUrl(jsonRespose.signedUrlGet));
                await this.fetchPresignedUrlDelete(jsonRespose.signedUrlDelete);
                this.renderAppropriateStream(startDate, endDate);
                // this.events = {}
                // this.events = {...JSON.parse(JSON.stringify(jsonRespose.data.events))};
                // let lastEvaluatedKey = jsonRespose.lastEvaluatedKey;
                // //console.log('lastevaluatedkey0', lastEvaluatedKey);
                // var recallCount = 0;
                // do {
                //   if(recallCount > 3) break;
                //   if(lastEvaluatedKey != null) {
                //     let urlBody2 : any = {"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "false", "exclusivestartkey": lastEvaluatedKey, "sdate": sDate, "edate": eDate, "view": view, "year": this.calendarStartYYYY}
                //     if(searchString.length > 0) {
                //       urlBody2["searchstring"] = searchString;
                //     }
                //     const xhr2 : any = (await this.prepareXhr(urlBody2, url, this._SfLoader, authorization)) as any;
                //     this._SfLoader.innerHTML = '';
                //     if(xhr2.status == 200) {
                //       const jsonRespose2 = JSON.parse(xhr2.responseText);
                //       for(var i = 0; i < Object.keys(JSON.parse(JSON.stringify(jsonRespose2.data.events))).length; i++) {
                //         const key = Object.keys(JSON.parse(JSON.stringify(jsonRespose2.data.events)))[i];
                //         this.events[key].push(...JSON.parse(JSON.stringify(jsonRespose2.data.events))[key]);
                //       }
                //       //console.log('consolidated', this.events)
                //       //console.log(jsonRespose2);
                //       this.renderAppropriateStream(startDate, endDate);
                //       lastEvaluatedKey = jsonRespose2.lastEvaluatedKey;
                //       //console.log('lastevaluatedkey1', lastEvaluatedKey);
                //     } else {
                //       //console.log('calendar fetching error breaking');
                //       break;
                //     }
                //   } else {
                //     //console.log('calendar fetching breaking');
                //     break;
                //   }
                // } while(1)
            }
            else {
                if (xhr.status === 404) {
                    this.showChosenProject();
                    this._SfTitleChosenProject.innerHTML = this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0];
                    this.renderChosenProject();
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.fetchUserCalendar = async () => {
            let url = "https://" + this.apiId + "/getuserevents";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.showChosenProject();
                //console.log(jsonRespose);
                this.events = (jsonRespose.data.events);
                if (this.events != null) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
                // this.renderChosenProject(events);
            }
            else {
                if (xhr.status === 404) {
                    this.showChosenProject();
                    this._SfTitleChosenProject.innerHTML = this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0];
                    this.renderChosenProject();
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.fetchCalendar = async () => {
            //this.apiBodyList = '{"id": "' +(this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0]+ '"}'
            let url = "https://" + this.apiId + "/getcalendar";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0] }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.showChosenProject();
                this._SfTitleChosenProject.innerHTML = this.truncate(this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0], 20, true);
                this.events = JSON.parse(jsonRespose.data.value.events);
                // //console.log(events);
                if (this.events != null) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
                // this.renderChosenProject(events);
            }
            else {
                if (xhr.status === 404) {
                    this.showChosenProject();
                    this._SfTitleChosenProject.innerHTML = this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0];
                    this.renderChosenProject();
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.fetchReprogramAdhoc = async () => {
            let url = "https://" + this.apiId + "/reprogramtrigger";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.mode == "admin" ? this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0] : this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                // const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                this.fetchList();
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.fetchAdhoc = async () => {
            let path = "getallmyevents", view = "";
            if (this.tagId != null && this.tagId != "") {
                view = "tag";
            }
            else if (this.countryId != null && this.countryId != "") {
                view = "country";
            }
            else if (this.locationId != null && this.locationId != "") {
                view = "location";
            }
            else {
                view = "entity";
            }
            let url = "https://" + this.apiId + "/" + path;
            let urlBody = { "projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "true", "year": this.calendarStartYYYY, "view": view };
            //console.log('urlbody', urlBody);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                this.fetchList();
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.fetchEventMap = async () => {
            let url = "https://" + this.apiId + "/getunmappedevents";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "role": this.myRole }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                //console.log(jsonRespose);
                this.unmappedEvents = jsonRespose.data.unmappedEvents;
                this.mappings = jsonRespose.data.mappings;
                //console.log('mappings-1', 'fetcheventmap', this.mappings)
                //console.log('mappings0', 'fetcheventmap', this.mappedValuesUsers)
                this.renderMapping(this.unmappedEvents);
                //console.log('mappings1', 'fetcheventmap', this.mappedValuesUsers)
                this.prepopulateMapping(this.mappings);
                //console.log('mappings2', 'fetcheventmap', this.mappedValuesUsers)
                this.applyFilter();
                if (jsonRespose.data.mappings != null && this.myRole != this.TAB_APPROVER) {
                    this._SfButtonBackCalendarMapping.style.visibility = 'visible';
                }
                else {
                    this._SfButtonBackCalendarMapping.style.visibility = 'hidden';
                }
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                this.fetchList();
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.fetchList = async () => {
            //console.log('calendar fetching list', this.apiIdList);
            const body = this.getApiBodyList();
            if (this.apiIdList != null) {
                body.id = this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0];
                let url = "https://" + this.apiIdList + "/" + this.apiMethodList;
                //console.log('fetch events url', url);
                const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
                this._SfLoader.innerHTML = '';
                //console.log('fetch events body', body);
                if (xhr.status == 200) {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    //console.log('list response', JSON.stringify(jsonRespose));
                    const fieldArr = JSON.parse(jsonRespose.data.value[this.apiResponseFieldList]);
                    this.events = null;
                    for (var i = 0; i < fieldArr.length; i++) {
                        //console.log('events', fieldArr[i]);
                        await this.fetchDetail(fieldArr[i]);
                    }
                    //console.log('all events processed');
                    await this.uploadEvents();
                    await this.fetchReprogramAdhoc();
                    //await this.fetchAdhoc(true);
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.initCalendar = async () => {
            var newDate = null;
            var newMonth = null;
            var newYear = null;
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            //console.log('startDate', startDate);
            do {
                this.calendar.push(startDate);
                startDate.setDate(startDate.getDate() + 1);
                newDate = ("0" + startDate.getDate()).slice(-2);
                newMonth = ("0" + startDate.getMonth()).slice(-2);
                newYear = (startDate.getFullYear());
            } while (!(newDate == this.calendarStartDD && newMonth == (("0" + ((parseInt(this.calendarStartMM) - 1) + "")).slice(-2)) && newYear === (parseInt(this.calendarStartYYYY) + 1)));
            //console.log(this.calendar);
        };
        this.initInputs = () => {
            this.calendarStartDD = ("0" + this.calendarStartDD).slice(-2);
            this.calendarStartMM = ("0" + this.calendarStartMM).slice(-2);
        };
        this.showChooseProject = () => {
            var elems = this._SfIEventsC.querySelectorAll('.choose-project');
            var index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'flex';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-project');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-mapping');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
        };
        this.showChosenProject = () => {
            var elems = this._SfIEventsC.querySelectorAll('.choose-project');
            var index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-project');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'flex';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-mapping');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
        };
        this.showChosenMapping = () => {
            var elems = this._SfIEventsC.querySelectorAll('.choose-project');
            var index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-project');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-mapping');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'flex';
            }
        };
        this.truncate = (str, n, useWordBoundary, ellipsis = true) => {
            if (str.length <= n) {
                return str;
            }
            const subString = str.slice(0, n - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + (ellipsis ? "&hellip;" : "...");
        };
        this.initListenersAdmin = () => {
            var _a, _b, _c, _f, _g, _h, _k;
            var old_element = null;
            var new_element = null;
            old_element = this._SfProject[0].querySelector('#sf-i-project');
            new_element = old_element.cloneNode(true);
            (_a = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(new_element, old_element);
            this._SfProject[0].querySelector('#sf-i-project').addEventListener('valueChanged', async () => {
                this._SfTitleChosenMapping.innerHTML = this.truncate(this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0], 20, true);
                this.showChosenMapping();
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            });
            old_element = this._SfButtonBackChosenProject;
            new_element = old_element.cloneNode(true);
            (_b = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _b === void 0 ? void 0 : _b.replaceChild(new_element, old_element);
            this._SfButtonBackChosenProject.addEventListener('click', async () => {
                this.loadMode();
            });
            old_element = this._SfButtonSyncChosenProject;
            new_element = old_element.cloneNode(true);
            (_c = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _c === void 0 ? void 0 : _c.replaceChild(new_element, old_element);
            this._SfButtonSyncChosenProject.addEventListener('click', async () => {
                this.fetchList();
            });
            old_element = this._SfButtonBackChosenMapping;
            new_element = old_element.cloneNode(true);
            (_f = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _f === void 0 ? void 0 : _f.replaceChild(new_element, old_element);
            this._SfButtonBackChosenMapping.addEventListener('click', async () => {
                this.loadMode();
            });
            old_element = this._SfButtonMapChosenProject;
            new_element = old_element.cloneNode(true);
            (_g = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _g === void 0 ? void 0 : _g.replaceChild(new_element, old_element);
            this._SfButtonMapChosenProject.addEventListener('click', async () => {
                this._SfTitleChosenMapping.innerHTML = this.truncate(this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0], 20, true);
                this.showChosenMapping();
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            });
            old_element = this._SfButtonBackCalendarMapping;
            new_element = old_element.cloneNode(true);
            (_h = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _h === void 0 ? void 0 : _h.replaceChild(new_element, old_element);
            this._SfButtonBackCalendarMapping.addEventListener('click', async () => {
                this.fetchCalendar();
            });
            old_element = this._SfButtonBackSyncMapping;
            new_element = old_element.cloneNode(true);
            (_k = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _k === void 0 ? void 0 : _k.replaceChild(new_element, old_element);
            this._SfButtonBackSyncMapping.addEventListener('click', async () => {
                this.fetchList();
            });
        };
        this.loadMode = async () => {
            var _a, _b;
            Chart.register(...registerables);
            //Chart.register(Colors);
            if (this.mode == "rcmnotifications") {
                this.loadRcmNotifications();
            }
            else if (this.mode == "rcm") {
                this.renderRcmTabs();
                this._SfRcmTabContainer.querySelector('#rcm-tab-compliances').click();
            }
            else if (this.mode == "onboarding") {
                //this.myOnboardingTab = this.TAB_STATUTES;
                this.renderOnboardingTabs();
                // this.clickOnboardingTabs();
                //this.loadOnboardingStatutes();
                //((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-compliances') as HTMLButtonElement).click();
            }
            else if (this.mode == "admin") {
                this.showChooseProject();
                this.initListenersAdmin();
            }
            else {
                this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
                this.enableCalendar();
                this.initInputs();
                this.initCalendar();
                let tempRole = this.myRole;
                if (tempRole == "") {
                    this.myRole = this.TAB_REPORTER;
                }
                this.renderRoleTabs();
                if (tempRole != "") {
                    this._SfRoleTabContainer.innerHTML = '';
                }
                //console.log('stream received', this.stream, this.TAB_STREAM, this.TAB_YEAR);
                if (this.stream == this.TAB_YEAR) {
                    this.renderTabs(this.TAB_YEAR);
                    (_a = this._SfTabContainer.querySelector('#calendar-tab-year')) === null || _a === void 0 ? void 0 : _a.click();
                }
                else {
                    //console.log('stream received rendering year', this.stream);
                    this.renderTabs(this.TAB_STREAM);
                    (_b = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _b === void 0 ? void 0 : _b.click();
                }
                //await this.fetchUserCalendar_2();
                // if(this.events != null && !this.foundCalendarInLocal()) {
                //   this.renderTabs(this.TAB_YEAR);
                //   this.renderCalendar();
                // }
            }
        };
    }
    enableUpcoming() {
        this.clearTabs();
        this._SfUpcomingContainer.style.display = 'flex';
    }
    enableThis() {
        this.clearTabs();
        this._SfThisContainer.style.display = 'flex';
    }
    enablePast() {
        this.clearTabs();
        this._SfPastContainer.style.display = 'flex';
    }
    enableCustom() {
        this.clearTabs();
        this._SfCustomContainer.style.display = 'flex';
    }
    enableFind() {
        this.clearTabs();
        this._SfFindContainer.style.display = 'flex';
    }
    enableAdhoc() {
        this.clearTabs();
        this._SfAdhocContainer.style.display = 'flex';
    }
    enableRegisters() {
        this.clearTabs();
        this._SfRegisterContainer.style.display = 'flex';
    }
    getFirstDayOfLastMonth(yourDate) {
        var d = new Date(yourDate);
        d.setDate(1);
        d.setMonth(d.getMonth() - 1);
        return d;
    }
    firstUpdated(_changedProperties) {
        this.loadMode();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        if (this.mode == "rcmnotifications") {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20 flex-wrap" part="rcm-container" id="rcm-container">

          </div>
          
          
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
        else if (this.mode == "rcm") {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20 flex-wrap" id="rcm-tab-container">

          </div>
          
          <div class="d-flex justify-center">
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-compliance-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-projects-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-date-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-confirm-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-jobs-container">
              
            </div>
          </div>
          
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
        else if (this.mode == "onboarding") {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex mb-20 flex-wrap" id="onboarding-status-container">

          </div>

          <div class="d-flex justify-center mb-20 flex-wrap" id="onboarding-tab-container">

          </div>
          
          <div class="d-flex justify-center">
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="statutes-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="compliances-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="countries-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="entities-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="locations-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="functions-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="tags-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="reporters-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="approvers-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="functionheads-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="auditors-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="viewers-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="docs-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="makercheckers-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="duedates-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="extensions-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="alertschedules-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="activations-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="invalidations-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="triggers-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="internalcontrols-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="signoff-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="calendar-container">
              
            </div>
          </div>
          
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
        else if (this.mode == "admin") {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
            
          <div class="d-flex justify-center">
            <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Admin</div>
          </div>
          <br />
          <div class="loader-element"></div>
          <div class="choose-project" class="d-flex justify-center align-start">
            <div class="d-flex flex-grow justify-center align-start">
              <h3 part="results-title" id="title-choose-project" class="m-0">Choose Project</h3>
            </div>
          </div>
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div class=" main-container">
                <div class="chosen-project" class="d-flex justify-center align-start">
                  <div class="d-flex flex-grow justify-between align-start">
                    <div class="d-flex justify-center">
                      &nbsp;<button id="button-back-chosen-project" part="button-icon" class="button-icon"><span class="material-icons">keyboard_backspace</span></button>
                      &nbsp;<button part="button-icon" class="invisible button-icon"><span class="material-icons">keyboard_backspace</span></button>
                    </div>
                    <h3 part="results-title" id="title-chosen-project" class="m-0">Project Name</h3>
                    <div class="d-flex justify-center">
                      <button id="button-sync-chosen-project" part="button-icon" class="button-icon"><span class="material-icons">sync</span></button>
                      &nbsp;
                      <button id="button-map-chosen-project" part="button-icon" class="button-icon"><span class="material-icons">person_add</span></button>
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div class="chosen-mapping" class="d-flex justify-center align-center">
                  <div class="d-flex flex-grow justify-between align-start">
                    <div>
                      &nbsp;
                      <button id="button-back-chosen-mapping" part="button-icon" class="button-icon"><span class="material-icons">keyboard_backspace</span></button>
                      <button part="button-icon" class="invisible button-icon"><span class="material-icons">calendar_month</span></button>
                    </div>
                    <h3 part="results-title" id="title-chosen-mapping" class="m-0">Project Name</h3>
                    <div>
                      <button id="button-back-sync-mapping" part="button-icon" class="button-icon"><span class="material-icons">cloud_download</span></button>
                      <button id="button-back-calendar-mapping" part="button-icon" class="invisible button-icon"><span class="material-icons">calendar_month</span></button>
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div class="choose-project" class="d-flex justify-center align-start">
                  <div class=" mt-20">
                    <slot name="project"></slot>
                  </div>
                </div>
                <div id="container-chosen-project" class="chosen-project hide d-flex justify-center align-start mt-20">
                  
                </div>
                <div class="chosen-project d-flex justify-center flex-wrap" id="tab-container">

                </div>
              
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="calendar-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="stream-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="upcoming-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="this-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="past-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="custom-container">
                  
                </div>

                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="adhoc-container">
                  
                </div>

                <div class="chosen-mapping d-flex justify-center mt-20" id="mapping-tab-container">

                </div>
                <div class="chosen-mapping d-flex flex-col mb-100" id="mapping-container">
                </div>
              </div>
              <div class="rb"></div>
          </div>
          <div id="detail-container" class="hide" part="detail-container">
          </div>
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
        else {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20" id="role-tab-container">

          </div>
          
          <div class="d-flex justify-center" id="tab-container">

          </div>
          <div class="d-flex justify-center">
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="stream-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="upcoming-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="this-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="past-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="custom-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="calendar-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="find-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="adhoc-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="register-container">
              
            </div>
          </div>
          <div id="detail-container" class="hide" part="detail-container">
          </div>
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
    }
};
SfIEvents.styles = css `

    .bg-white {
      background-color: white;
    }

    .proposed-users-table {

      width: 150px;

    }

    #calendar-tab-next span {
      font-size: 80%;
    }

    .justify-evenly {
      justify-content: space-evenly;
    }

    #detail-container {
      z-index: 101;
    }

    .plain-filter-icon {
      cursor: pointer;
    }

    .pos-fixed {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      min-height: 100%;
      z-index: 101;
    }

    .sub-button {
      font-size: 80%;
    }

    .sub-button span {
      font-size: 80%;
    }

    .pos-fixed-scroll {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 50px;
      right: 50px;
      z-index: 99;
    }

    .cover-slide {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.4;
    }

    .detail-container {
      width: 60%;
      height: 400px;
      background-color: #efefef;
      overflow-y: auto;
      border-radius: 10px;
      z-index: 102;
    }

    @media (orientation: portrait) {

      .detail-container {
        width: 80%;
        height: 400px;
        background-color: #efefef;
        overflow-y: auto;
        border-radius: 10px;
      }

    }

    .box {
      margin-top: 20px;
      height: 10px;
      width: 100%;
      background: linear-gradient(-45deg, transparent 10%, #ccc 5%, transparent 60%);
      background-size: 300%;
      background-position-x: 100%;
      animation: shimmer 1.5s infinite linear;
      margin-bottom: 20px;
    }

    .chosen {
      background-color: #E5FAD4 !important;
    }
  
    @keyframes shimmer {
      to {
         background-position-x: 0%
      }
   }  

   .truncate {
    display: none
   }

    @media (orientation: landscape) {

      .chart-container {
        width: 100%;
        overflow-x: scroll;
      }

      .chart-item {
        min-width: 40%;
      }

    }

    @media (orientation: portrait) {

      .chart-container {
        width: 100%;
        overflow-x: scroll;
      }

      .chart-item {
        width: 100%;
      }

    }


    @media (orientation: portrait) {

      #tab-container {
        position: fixed;
        bottom: 0px;
        left: 0px;
        background-color: #efefef;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        overflow-x: auto;
        width: 100%;
        max-width: 100%;
        justify-content: start;
        box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
        z-index: 101;
      }
      

    }

    @media (orientation: landscape) {

      .mobile-only {
        display: none;
      }

      .desktop-only {
        display: flex;
      }

    }

    .title-byline {
      font-size: 90%;
    }

    @media (orientation: portrait) {

      .mobile-only {
        display: flex;
      }

      .desktop-only {
        display: none;
      }

    }
    
    .SfIEventsC {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    .invisible {
      visibility: hidden;
    }

    .scroll-x {
      overflow-x: auto;
    }

    .mw-140 {
      max-width: 140%
    }
    
    .no-shrink {
      flex-shrink: 0;
    }

    .p-10 {
      padding: 10px;
    }

    .cursor {
      cursor: pointer;
    }

    .commentbox {
      padding: 10px;
      border: solid 1px gray;
      border-radius: 10px;
    }

    .reporterbox {
      width: 90%;
      margin-right: 10%;
    }

    .approverbox {
      width: 90%;
      margin-left: 5%;
    }

    .pr-5 {
      padding-right: 5px;
    }

    .pt-5 {
      padding-top: 5px;
    }

    .pb-5 {
      padding-bottom: 5px;
    }

    .pb-20 {
      padding-bottom: 20px;
    }

    .m-20 {
      margin: 20px;
    }

    .m-10 {
      margin: 10px;
    }

    .text-start {
      text-align: start;
    }

    .text-center {
      text-align: center;
    }

    .mb-0 {
      margin-bottom: 0px;
    }

    .mt-0 {
      margin-top: 0px;
    }

    .ml-0 {
      margin-left: 0px;
    }

    .mr-0 {
      margin-right: 0px;
    }

    .mb-100 {
      margin-bottom: 100px;
    }

    .mb-10 {
      margin-bottom: 10px;
    }

    .mb-5 {
      margin-bottom: 5px;
    }

    .mt-5 {
      margin-top: 5px;
    }

    #button-back-add-mapping {
      bottom: 10px;
      z-index: 98;
      position: sticky;
      width: 96%;
      margin-left: 2%;
      margin-right: 2%;
    }

    .fixed-bottom {
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      z-index: 99;
    }

    .div-graph-complete {
      background-color: #50cf01;
      height: 100%;
      width: 0%;
    }

    .div-graph-pending {
      background-color: #ffe505;
      height: 100%;
      width: 100%;
    }

    input:not([type='radio']) {

    border-width: 0px;      
    border-radius: 5px;
    color: #666;
    background: #efefef;
    box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
    border-top: solid 1px rgba(255, 255, 255, 0.3);
    border-left: solid 1px rgba(255, 255, 255, 0.3);
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    border-right: solid 1px rgba(0, 0, 0, 0.1);
    padding: 10px;

    }

    .bg-pending {
      background-color: #ffe505;
    }

    .bg-done {
      background-color: #50cf01;
    }

    .color-pending {
      color: #ffe505;
    }
    .color-pending-approval {
      color: #ffe505;
    }
    .color-not-started {
      color: #888888;
    }
    .color-not-complied {
      color: #C80036;
    }
    .color-partially-complied {
      color: #F79256;
    }
    .color-complied {
      color: #50cf01;
    }
    .color-scheduled {
      color: #888888;
    }
    .color-done {
      color: #50cf01;
    }
    .color-rejected {
      color: #C80036;
    }
    .color-approved {
      color: #50cf01;
    }
    .color-past-due-date {
      color: #ffe505;
    }
    .color-late-executed {
      color: #840B0F;
    }
    .color-late-approved {
      color: #EE2F36;
    }
    .color-late-reported {
      color: #Ef9C66;
    }

    .pr-10 {
      padding-right: 10px;
    }

    .pt-10 {
      padding-top: 10px;
    }

    .pt-20 {
      padding-top: 20px;
    }

    .pb-10 {
      padding-bottom: 10px;
    }

    .bg-left {
      border-top: solid 1px #dcdcdc;
      padding-right: 5px;
    }

    .bg-left-no-border {
      padding-right: 5px;
    }

    .m-0 {
      margin: 0px;
    }

    .mt-10 {
      margin-top: 10px;
    }

    .mt-5 {
      margin-top: 5px;
    }

    .ml-10 {
      margin-left: 10px;
    }

    .mt-20 {
      margin-top: 20px;
    }

    .ml-20 {
      margin-left: 20px;
    }

    .mr-20 {
      margin-right: 20px;
    }

    .mb-20 {
      margin-bottom: 20px;
    }

    .flex-grow {
      flex-grow: 1;
    }

    .flex-wrap {
      flex-wrap: wrap;
    }

    .left-sticky {
      left: 0px;
      position: sticky;
      z-index: 100;
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .accordian-head {
      cursor: pointer;
    }

    .button-submit {
      font-weight: 800;
      font-size: 110%;
    }

    .mr-10 {
      margin-right: 10px;
    }

    .pl-5 {
      padding-left: 5px;
    }

    .pl-10 {
      padding-left: 10px;
    }

    .pr-10 {
      padding-right: 10px;
    }

    .pl-20 {
      padding-left: 20px;
    }

    .pr-20 {
      padding-right: 20px;
    }

    .gone {
      display: none
    }

    .loader-element {
      position: fixed;
      right: 30px;
      top: 30px;
      margin-left: 5px;
    }

    #row-unmapped-graph {
      width: 300px;
      height: 10px;
    }

    #stream-container {
      padding: 0%;
    }

    #custom-container {
      padding: 0%;
    }

    #adhoc-container {
      padding: 0%;
    }

    #upcoming-container {
      padding: 0%;
    }

    .container-mapping-event {
      overflow-x: auto;
    }

    #this-container {
      padding: 2%;
    }

    #past-container {
      padding: 2%;
    }

    .stream-event-list {
      margin-left: 0px;
      padding: 10px;
    }

    .stream-events-container {
      overflow-x: auto;
      width: 100%
    }
    .stream-event-list-container {
      width: 200px;
    }

    .stream-event-selected {
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    
    .stream-event-not-selected {
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      color: #aaa;
      font-size: 80%;
    }

    .stream-event-not-selected-hidden {
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      color: #aaa;
      line-height: 0.05;
    }

    .stream-month-selected {
      padding: 10px;
      text-align: center;
    }

    .stream-month-not-selected {
      padding: 10px;
      text-align: center;
    }

    .calendar-left-col {
      width: 30%;
    }

    @media (orientation: portrait) {

      .calendar-right-data {
        width: 100%;
      }

    }

    @media (orientation: landscape) {

      .calendar-right-data {
        width: 70%;
      }

    }
    

    .day-item {
      width: 14%;
      margin-bottom: 5px;
      text-align: center;
    }

    .date-item {
      font-size: 80%;
      color: #333;
    }

    .date-item-before {
      font-size: 80%;
      color: #999;
    }

    .dot {
      height: 4px;
      border-radius: 3px;
    }

    .title-item {
      padding: 5px;
      margin-bottom: 20px;
    }

    .title-item-date {
      padding-right: 5px;
      margin-bottom: 20px;
    }

    .calendar-item {
      padding: 8px;
      width: 90%;
      margin-bottom: 20px;
    }

    .muted {
      color: gray;
    }

    .td-head {
      text-transform: capitalize;
    }

    .tab-button {
      padding: 10px;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 105%;
      margin-left: 5px;
      margin-right: 5px;
    }

    .td-body {
      padding: 5px;
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-highlight {
      background-color: black;
      color: white;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    td {
      white-space: nowrap;
    }

    .w-100 {
      width: 100%;
    }

    .w-90 {
      width: 90%;
    }

    .fw-100 {
      font-weight: 100;
    }

    .fw-200 {
      font-weight: 200;
    }

    .fw-300 {
      font-weight: 300;
    }

    .fw-600 {
      font-weight: 600;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-stretch {
      align-items: stretch;
    }

    .align-baseline {
      align-items: baseline;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-center {
      align-items: center;
    }
    
    .lds-text {
      position: absolute;
      left: 0px;
      top: 0px;
      margin-top: 2px;
      margin-left: 2px;
      width: 50px;
      height: 50px;
      color: gray;
    }

    .lds-text-c {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      font-size: 90%;
    }

    .lds-text-c-i {
    }

    .lds-dual-ring {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 50px;
      height: 50px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      background-color: white;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
      z-index: 102;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-end {
      justify-content: flex-end;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    .main-container {
      width: 90%;
      overflow-x: auto;
    }

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }


      .calendar-item {
        width: 20%;
        margin: 2%;
        padding: 8px;
      }

      .main-container {
        width: 40%;
      }

    }
    

  `;
__decorate([
    property()
], SfIEvents.prototype, "filteronboarding", void 0);
__decorate([
    property()
], SfIEvents.prototype, "locations", void 0);
__decorate([
    property()
], SfIEvents.prototype, "selectedCbs", void 0);
__decorate([
    property()
], SfIEvents.prototype, "projectId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "contractStartDate", void 0);
__decorate([
    property()
], SfIEvents.prototype, "name", void 0);
__decorate([
    property()
], SfIEvents.prototype, "disableflagggrcresponse", void 0);
__decorate([
    property()
], SfIEvents.prototype, "disablesave", void 0);
__decorate([
    property()
], SfIEvents.prototype, "disableclientresponse", void 0);
__decorate([
    property()
], SfIEvents.prototype, "disablesignoff", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdStatutes", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdProjects", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdCompliances", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdDetail", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdUsers", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdTags", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiMethodList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiMethodDetail", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiBodyList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiBodyDetail", void 0);
__decorate([
    property()
], SfIEvents.prototype, "userProfileId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "graphParam", void 0);
__decorate([
    property()
], SfIEvents.prototype, "entityId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "locationId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "showRegisterExport", void 0);
__decorate([
    property()
], SfIEvents.prototype, "countryId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "functionId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "tagId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "userName", void 0);
__decorate([
    property()
], SfIEvents.prototype, "projectName", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiResponseFieldList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "rcmSelectedCompliance", void 0);
__decorate([
    property()
], SfIEvents.prototype, "rcmSelectedProjects", void 0);
__decorate([
    property()
], SfIEvents.prototype, "rcmSelectedDate", void 0);
__decorate([
    property()
], SfIEvents.prototype, "rcmSelectedMessage", void 0);
__decorate([
    property()
], SfIEvents.prototype, "myOnboardingTab", void 0);
__decorate([
    property()
], SfIEvents.prototype, "myOnboardingTabGroup", void 0);
__decorate([
    property()
], SfIEvents.prototype, "myRcmTab", void 0);
__decorate([
    property()
], SfIEvents.prototype, "myRole", void 0);
__decorate([
    property()
], SfIEvents.prototype, "chart", void 0);
__decorate([
    property()
], SfIEvents.prototype, "chart2", void 0);
__decorate([
    property()
], SfIEvents.prototype, "chart3", void 0);
__decorate([
    property()
], SfIEvents.prototype, "chart4", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendarStartDD", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendarStartMM", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendarStartYYYY", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendar", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappedValuesDueDates", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappedValuesUsers", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappedValuesTags", void 0);
__decorate([
    property()
], SfIEvents.prototype, "unmappedEvents", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappings", void 0);
__decorate([
    property()
], SfIEvents.prototype, "triggers", void 0);
__decorate([
    property()
], SfIEvents.prototype, "monthNames", void 0);
__decorate([
    property()
], SfIEvents.prototype, "events", void 0);
__decorate([
    property()
], SfIEvents.prototype, "streamIndex", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventsInWindow", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventHideFields", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventPreviewFields", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventFields", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventFieldDependencies", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvDataRegisters", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvDataCompliances", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvTableData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvDataStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvGraphStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvCompletenessStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvTimelinessStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvComplianceStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "htmlDataCompliances", void 0);
__decorate([
    property()
], SfIEvents.prototype, "htmlDataStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "period", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mode", void 0);
__decorate([
    property()
], SfIEvents.prototype, "flowRcmNotification", void 0);
__decorate([
    property()
], SfIEvents.prototype, "flowGraph", void 0);
__decorate([
    property()
], SfIEvents.prototype, "flow", void 0);
__decorate([
    property()
], SfIEvents.prototype, "fill", void 0);
__decorate([
    property()
], SfIEvents.prototype, "filterTags", void 0);
__decorate([
    property()
], SfIEvents.prototype, "subfilter", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskAreasData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskAreasPartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskAreasLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskAreasComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskSeverityData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "arrCols", void 0);
__decorate([
    property()
], SfIEvents.prototype, "arrRcmProjectCols", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskSeverityPartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskSeverityLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "riskSeverityComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "functionData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "functionPartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "functionLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "functionComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "obligationTypeData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "obligationTypePartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "obligationTypeLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "obligationTypeComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "jurisdictionData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "jurisdictionPartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "jurisdictionLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "jurisdictionComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "currentColumnIndex", void 0);
__decorate([
    property()
], SfIEvents.prototype, "frequencyData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "frequencyPartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "frequencyLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "frequencyComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "subcategoryData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "subcategoryPartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "subcategoryLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "subcategoryComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "locationData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "locationPartStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "locationLateStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "locationComplianceStatusData", void 0);
__decorate([
    property()
], SfIEvents.prototype, "selectedItems", void 0);
__decorate([
    property()
], SfIEvents.prototype, "selectedStatus", void 0);
__decorate([
    property()
], SfIEvents.prototype, "selectedTab", void 0);
__decorate([
    property()
], SfIEvents.prototype, "selectedCountryTab", void 0);
__decorate([
    property()
], SfIEvents.prototype, "restrictToMapping", void 0);
__decorate([
    property()
], SfIEvents.prototype, "enableDeleteLatestReport", void 0);
__decorate([
    property()
], SfIEvents.prototype, "stream", void 0);
__decorate([
    query('.SfIEventsC')
], SfIEvents.prototype, "_SfIEventsC", void 0);
__decorate([
    query('.div-row-error')
], SfIEvents.prototype, "_SfRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfIEvents.prototype, "_SfRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfIEvents.prototype, "_SfRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfIEvents.prototype, "_SfRowSuccessMessage", void 0);
__decorate([
    query('.loader-element')
], SfIEvents.prototype, "_SfLoader", void 0);
__decorate([
    query('#calendar-container')
], SfIEvents.prototype, "_SfCalendarContainer", void 0);
__decorate([
    query('#button-generate')
], SfIEvents.prototype, "_SfButtonGenerate", void 0);
__decorate([
    query('.button-search')
], SfIEvents.prototype, "_SfButtonSearch", void 0);
__decorate([
    query('.button-save')
], SfIEvents.prototype, "_SfButtonSave", void 0);
__decorate([
    query('.button-next')
], SfIEvents.prototype, "_SfButtonNext", void 0);
__decorate([
    query('.button-prev')
], SfIEvents.prototype, "_SfButtonPrev", void 0);
__decorate([
    query('.input-search')
], SfIEvents.prototype, "_SfInputSearch", void 0);
__decorate([
    query('#button-sync-chosen-project')
], SfIEvents.prototype, "_SfButtonSyncChosenProject", void 0);
__decorate([
    query('#button-map-chosen-project')
], SfIEvents.prototype, "_SfButtonMapChosenProject", void 0);
__decorate([
    query('#button-back-chosen-project')
], SfIEvents.prototype, "_SfButtonBackChosenProject", void 0);
__decorate([
    query('#button-back-calendar-mapping')
], SfIEvents.prototype, "_SfButtonBackCalendarMapping", void 0);
__decorate([
    query('#button-back-sync-mapping')
], SfIEvents.prototype, "_SfButtonBackSyncMapping", void 0);
__decorate([
    query('#button-back-chosen-mapping')
], SfIEvents.prototype, "_SfButtonBackChosenMapping", void 0);
__decorate([
    query('#title-chosen-project')
], SfIEvents.prototype, "_SfTitleChosenProject", void 0);
__decorate([
    query('#title-chosen-mapping')
], SfIEvents.prototype, "_SfTitleChosenMapping", void 0);
__decorate([
    query('#container-chosen-project')
], SfIEvents.prototype, "_SfContainerChosenProject", void 0);
__decorate([
    query('#container-project-select')
], SfIEvents.prototype, "_SfContainerProjectSelect", void 0);
__decorate([
    query('#container-project-actions')
], SfIEvents.prototype, "_SfContainerProjectActions", void 0);
__decorate([
    query('#stream-container')
], SfIEvents.prototype, "_SfStreamContainer", void 0);
__decorate([
    query('#upcoming-container')
], SfIEvents.prototype, "_SfUpcomingContainer", void 0);
__decorate([
    query('#detail-container')
], SfIEvents.prototype, "_SfDetailContainer", void 0);
__decorate([
    query('#this-container')
], SfIEvents.prototype, "_SfThisContainer", void 0);
__decorate([
    query('#past-container')
], SfIEvents.prototype, "_SfPastContainer", void 0);
__decorate([
    query('#custom-container')
], SfIEvents.prototype, "_SfCustomContainer", void 0);
__decorate([
    query('#adhoc-container')
], SfIEvents.prototype, "_SfAdhocContainer", void 0);
__decorate([
    query('#find-container')
], SfIEvents.prototype, "_SfFindContainer", void 0);
__decorate([
    query('#register-container')
], SfIEvents.prototype, "_SfRegisterContainer", void 0);
__decorate([
    query('#mapping-container')
], SfIEvents.prototype, "_SfMappingContainer", void 0);
__decorate([
    query('#stream-event-status')
], SfIEvents.prototype, "_SfStreamEventStatus", void 0);
__decorate([
    query('#tab-container')
], SfIEvents.prototype, "_SfTabContainer", void 0);
__decorate([
    query('#mapping-tab-container')
], SfIEvents.prototype, "_SfMappingTabContainer", void 0);
__decorate([
    query('#role-tab-container')
], SfIEvents.prototype, "_SfRoleTabContainer", void 0);
__decorate([
    query('#onboarding-tab-container')
], SfIEvents.prototype, "_SfOnboardingTabContainer", void 0);
__decorate([
    query('#onboarding-status-container')
], SfIEvents.prototype, "_SfOnboardingStatusContainer", void 0);
__decorate([
    query('#rcm-container')
], SfIEvents.prototype, "_SfRcmContainer", void 0);
__decorate([
    query('#rcm-container-list')
], SfIEvents.prototype, "_SfRcmContainerList", void 0);
__decorate([
    query('#rcm-tab-container')
], SfIEvents.prototype, "_SfRcmTabContainer", void 0);
__decorate([
    query('#statutes-list-container')
], SfIEvents.prototype, "_SfOnboardingStatutesListContainer", void 0);
__decorate([
    query('#rcm-compliance-container')
], SfIEvents.prototype, "_SfRcmComplianceContainer", void 0);
__decorate([
    query('#rcm-projects-container')
], SfIEvents.prototype, "_SfRcmProjectsContainer", void 0);
__decorate([
    query('#rcm-date-container')
], SfIEvents.prototype, "_SfRcmDateContainer", void 0);
__decorate([
    query('#rcm-confirm-container')
], SfIEvents.prototype, "_SfRcmConfirmContainer", void 0);
__decorate([
    query('#rcm-jobs-container')
], SfIEvents.prototype, "_SfRcmJobsContainer", void 0);
__decorate([
    query('#statutes-container')
], SfIEvents.prototype, "_SfOnboardingStatutesContainer", void 0);
__decorate([
    query('#compliances-list-container')
], SfIEvents.prototype, "_SfOnboardingCompliancesListContainer", void 0);
__decorate([
    query('#compliances-container')
], SfIEvents.prototype, "_SfOnboardingCompliancesContainer", void 0);
__decorate([
    query('#entities-list-container')
], SfIEvents.prototype, "_SfOnboardingEntitiesListContainer", void 0);
__decorate([
    query('#entities-container')
], SfIEvents.prototype, "_SfOnboardingEntitiesContainer", void 0);
__decorate([
    query('#functions-container')
], SfIEvents.prototype, "_SfOnboardingFunctionsContainer", void 0);
__decorate([
    query('#functions-list-container')
], SfIEvents.prototype, "_SfOnboardingFunctionsListContainer", void 0);
__decorate([
    query('#countries-container')
], SfIEvents.prototype, "_SfOnboardingCountriesContainer", void 0);
__decorate([
    query('#countries-list-container')
], SfIEvents.prototype, "_SfOnboardingCountriesListContainer", void 0);
__decorate([
    query('#locations-list-container')
], SfIEvents.prototype, "_SfOnboardingLocationsListContainer", void 0);
__decorate([
    query('#locations-container')
], SfIEvents.prototype, "_SfOnboardingLocationsContainer", void 0);
__decorate([
    query('#tags-list-container')
], SfIEvents.prototype, "_SfOnboardingTagsListContainer", void 0);
__decorate([
    query('#tags-container')
], SfIEvents.prototype, "_SfOnboardingTagsContainer", void 0);
__decorate([
    query('#reporters-list-container')
], SfIEvents.prototype, "_SfOnboardingReportersListContainer", void 0);
__decorate([
    query('#reporters-container')
], SfIEvents.prototype, "_SfOnboardingReportersContainer", void 0);
__decorate([
    query('#approvers-container')
], SfIEvents.prototype, "_SfOnboardingApproversContainer", void 0);
__decorate([
    query('#functionheads-container')
], SfIEvents.prototype, "_SfOnboardingFunctionHeadsContainer", void 0);
__decorate([
    query('#makercheckers-container')
], SfIEvents.prototype, "_SfOnboardingMakerCheckersContainer", void 0);
__decorate([
    query('#docs-container')
], SfIEvents.prototype, "_SfOnboardingDocsContainer", void 0);
__decorate([
    query('#auditors-container')
], SfIEvents.prototype, "_SfOnboardingAuditorsContainer", void 0);
__decorate([
    query('#extensions-container')
], SfIEvents.prototype, "_SfOnboardingExtensionsContainer", void 0);
__decorate([
    query('#viewers-container')
], SfIEvents.prototype, "_SfOnboardingViewersContainer", void 0);
__decorate([
    query('#approvers-list-container')
], SfIEvents.prototype, "_SfOnboardingApproversListContainer", void 0);
__decorate([
    query('#makercheckers-list-container')
], SfIEvents.prototype, "_SfOnboardingMakerCheckersListContainer", void 0);
__decorate([
    query('#docs-list-container')
], SfIEvents.prototype, "_SfOnboardingDocsListContainer", void 0);
__decorate([
    query('#functionheads-list-container')
], SfIEvents.prototype, "_SfOnboardingFunctionHeadsListContainer", void 0);
__decorate([
    query('#auditors-list-container')
], SfIEvents.prototype, "_SfOnboardingAuditorsListContainer", void 0);
__decorate([
    query('#viewers-list-container')
], SfIEvents.prototype, "_SfOnboardingViewersListContainer", void 0);
__decorate([
    query('#duedates-list-container')
], SfIEvents.prototype, "_SfOnboardingDuedatesListContainer", void 0);
__decorate([
    query('#extensions-list-container')
], SfIEvents.prototype, "_SfOnboardingExtensionsListContainer", void 0);
__decorate([
    query('#duedates-container')
], SfIEvents.prototype, "_SfOnboardingDuedatesContainer", void 0);
__decorate([
    query('#alertschedules-list-container')
], SfIEvents.prototype, "_SfOnboardingAlertSchedulesListContainer", void 0);
__decorate([
    query('#alertschedules-container')
], SfIEvents.prototype, "_SfOnboardingAlertSchedulesContainer", void 0);
__decorate([
    query('#activations-list-container')
], SfIEvents.prototype, "_SfOnboardingActivationListContainer", void 0);
__decorate([
    query('#activations-container')
], SfIEvents.prototype, "_SfOnboardingActivationsContainer", void 0);
__decorate([
    query('#invalidations-list-container')
], SfIEvents.prototype, "_SfOnboardingInvalidationListContainer", void 0);
__decorate([
    query('#invalidations-container')
], SfIEvents.prototype, "_SfOnboardingInvalidationsContainer", void 0);
__decorate([
    query('#triggers-container')
], SfIEvents.prototype, "_SfOnboardingTriggersContainer", void 0);
__decorate([
    query('#triggers-list-container')
], SfIEvents.prototype, "_SfOnboardingTriggersListContainer", void 0);
__decorate([
    query('#internalcontrols-list-container')
], SfIEvents.prototype, "_SfOnboardingInternalControlsListContainer", void 0);
__decorate([
    query('#internalcontrols-container')
], SfIEvents.prototype, "_SfOnboardingInternalControlsContainer", void 0);
__decorate([
    query('#signoff-container')
], SfIEvents.prototype, "_SfOnboardingSignoffContainer", void 0);
__decorate([
    query('#calendar-list-container')
], SfIEvents.prototype, "_SfOnboardingCalendarListContainer", void 0);
__decorate([
    query('#calendar-container')
], SfIEvents.prototype, "_SfOnboardingCalendarContainer", void 0);
__decorate([
    query('#onboarding-tab-group-0')
], SfIEvents.prototype, "_SfOnboardingTabGroup0", void 0);
__decorate([
    query('#onboarding-tab-group-1')
], SfIEvents.prototype, "_SfOnboardingTabGroup1", void 0);
__decorate([
    query('#onboarding-tab-group-2')
], SfIEvents.prototype, "_SfOnboardingTabGroup2", void 0);
__decorate([
    query('#onboarding-tab-group-3')
], SfIEvents.prototype, "_SfOnboardingTabGroup3", void 0);
__decorate([
    query('#onboarding-tab-group-button-0')
], SfIEvents.prototype, "_SfOnboardingTabGroupButton0", void 0);
__decorate([
    query('#onboarding-tab-group-button-1')
], SfIEvents.prototype, "_SfOnboardingTabGroupButton1", void 0);
__decorate([
    query('#onboarding-tab-group-button-2')
], SfIEvents.prototype, "_SfOnboardingTabGroupButton2", void 0);
__decorate([
    query('#onboarding-tab-group-button-3')
], SfIEvents.prototype, "_SfOnboardingTabGroupButton3", void 0);
__decorate([
    queryAssignedElements({ slot: 'project' })
], SfIEvents.prototype, "_SfProject", void 0);
__decorate([
    queryAssignedElements({ slot: 'uploader' })
], SfIEvents.prototype, "_SfUploader", void 0);
SfIEvents = __decorate([
    customElement('sf-i-events')
], SfIEvents);
export { SfIEvents };
//# sourceMappingURL=sf-i-events.js.map