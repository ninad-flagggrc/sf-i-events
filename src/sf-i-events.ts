/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
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
@customElement('sf-i-events')
export class SfIEvents extends LitElement {
  
  @property()
  apiIdList!: string;

  @property()
  apiIdDetail!: string;

  @property()
  apiMethodList!: string;

  @property()
  apiMethodDetail!: string;

  @property()
  apiBodyList!: string;

  @property()
  apiBodyDetail!: string;

  @property()
  apiResponseFieldList!: string;

  @property()
  calendarStartDD!: string;

  @property()
  calendarStartMM!: string;

  @property()
  calendarStartYYYY!: string;

  @property()
  calendar: Date [] = [];

  @property()
  monthNames: string []  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @property()
  events: any = null;

  @property()
  eventFields: any = null;

  getEventFields = () => {
    return JSON.parse(this.eventFields);
  }

  @property()
  eventFieldDependencies: any = null;

  getEventFieldDependencies = () => {
    return JSON.parse(this.eventFieldDependencies);
  }

  getApiBodyList = () => {
    console.log('calendar api body list', this.apiBodyList);
    try {
      return JSON.parse(this.apiBodyList);
    } catch (e: any) {
      return {};
    }
  }

  getApiBodyDetail = () => {
    return JSON.parse(this.apiBodyDetail);
  }

  @property()
  mode!: string;

  @property()
  flow: string = "";

  static override styles = css`

    
    .SfIEventsC {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
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
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .gone {
      display: none
    }

    .loader-element {
      position: fixed;
      right: 10px;
      top: 10px;
      margin-left: 5px;
    }

    #calendar-container {
      width: 90%;
    }

    .stream-event-list {
      margin-left: 10px;
      padding: 10px;
    }

    .stream-events-container {
      overflow-x: auto;
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

    .calendar-right-data {
      width: 70%;
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
      width: 6px;
      height: 6px;
      border-radius: 3px;
    }

    .title-item {
      padding: 5px;
      margin-bottom: 20px;
    }

    .calendar-item {
      width: 90%;
      margin-bottom: 20px;
    }

    .td-head {
      text-transform: capitalize;
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

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }

      #calendar-container {
        width: 40%;
      }

      .calendar-item {
        width: 20%;
        margin: 1%;
        padding: 1.5%;
      }

    }

  `;
  

  @query('.div-row-error')
  _SfRowError: any;

  @query('.div-row-error-message')
  _SfRowErrorMessage: any;

  @query('.div-row-success')
  _SfRowSuccess: any;

  @query('.div-row-success-message')
  _SfRowSuccessMessage: any;

  @query('.loader-element')
  _SfLoader: any;

  @query('#calendar-container')
  _SfCalendarContainer: any;

  @query('#stream-container')
  _SfStreamContainer: any;

  getEventField = (field: string) => {

    for(var i = 0; i < this.getEventFields().length; i++) {

      if(this.getEventFields()[i].field == field) {
        return this.getEventFields()[i];
      }

    }

  }

  getParentFieldFromDepedencies = (field: string) => {

    for(var i = 0; i < this.getEventFieldDependencies().length; i++) {

      if(this.getEventFieldDependencies()[i].type == "foreignkey" && this.getEventFieldDependencies()[i].child == field) {
        return this.getEventFieldDependencies()[i].parent;
      }

    }

    return null;

  }

  getEventTexts = (field: string, selectedId: Array<string>, row: any) => {

    console.log('get event texts', field, selectedId, row);

    if(this.getEventField(field) != null && this.getEventField(field).type == "sf-i-select") {

      var selectedIds = "";
      selectedIds += '[';
      for(var i = 0; i < selectedId.length; i++) {
        selectedIds += ('&quot;'+selectedId[i]+'&quot;');
        if(i < selectedId.length - 1) {
          selectedIds += ',';
        }
      }
      selectedIds += ']';

      return '<sf-i-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'"></sf-i-select>'

    }

    if(this.getEventField(field) != null && this.getEventField(field).type == "sf-i-sub-select") {

      const parentField = this.getParentFieldFromDepedencies(field);

      console.log('parentfield', parentField);

      var selectedIds = "";
      selectedIds += '[';
      for(var i = 0; i < selectedId.length; i++) {
        selectedIds += ('&quot;'+selectedId[i]+'&quot;');
        if(i < selectedId.length - 1) {
          selectedIds += ',';
        }
      }
      selectedIds += ']';

      const filterId = JSON.parse(row[parentField])[0];

      console.log('<sf-i-sub-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'" filterId="'+filterId+'"></sf-i-sub-select>');

      return '<sf-i-sub-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'" filterId="'+filterId+'"></sf-i-sub-select>'

    }

    if(this.getEventField(field) != null && this.getEventField(field).type == "sf-i-form") {

      console.log('<sf-i-form name="Select" apiId="'+this.getEventField(field).apiId+'" selectedId="'+selectedId[0]+'" projectField="'+this.getEventField(field).projectField+'" mode="text"></sf-i-form>');

      return '<sf-i-form name="Select" apiId="'+this.getEventField(field).apiId+'" selectedId="'+selectedId[0]+'" projectField="'+this.getEventField(field).projectField+'" mode="text"></sf-i-form>'
    }

    

    return "";
  }

  enableStream(value: boolean) {

    if(value) {
      (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
      (this._SfStreamContainer as HTMLDivElement).style.display = 'flex';
    } else {
      (this._SfCalendarContainer as HTMLDivElement).style.display = 'flex';
      (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    }

  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  clearMessages = () => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setError = (msg: string) => {
    this._SfRowError.style.display = 'flex';
    this._SfRowErrorMessage.innerHTML = msg;
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'flex';
    this._SfRowSuccessMessage.innerHTML = msg;
  }

  getLastDayOfLastMonth = (month: number, year: number) => {
    const date = new Date(year, month, 0);
    return date.getDate()
  }

  getLastDayOfMonth = (month: number, year: number) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate()
  }

  getBlanks = (month: number, year: number) => {

    const date = new Date(("0" + (month+1)).slice(-2) + '/01/' + year);
    const day = date.getDay();
    return day;

  }

  insertDates = (month: number, year: number) => {

    var html = "";

    html += '<div class="d-flex align-baseline flex-grow flex-wrap">';

    const dateNumber = this.getLastDayOfLastMonth(month, year);

    for(var i = 0; i < this.getBlanks(month, year); i++) {

      html += '<div class="day-item date-item-before fw-100">';
      html += dateNumber-(this.getBlanks(month, year) - i - 1);
      html += '</div>';  

    }

    for(i = 0; i < this.getLastDayOfMonth(month, year); i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i+1)).slice(-2);

      var partName = "";

      if(this.events[mmdd] != null) {
        partName = "compliance-calendar-day-with-compliance";
        html += '<div part="' + partName + '" class="day-item date-item fw-600">';
          html += '<div>'
            html += (i + 1);
          html += '</div>'
          html += '<div class="d-flex justify-center">'
            html += '<div part="compliance-date-indicator-primary" class="dot"></div>'
          html += '</div>'
        html += '</div>';  
      } else {
        partName = "compliance-calendar-day-without-compliance";
        html += '<div part="' + partName + '" class="day-item date-item fw-100">';
          html += '<div>'
            html += (i + 1);
          html += '</div>'
        html += '</div>'; 
      }

    }

    for(i = 0; i < 42 - (this.getBlanks(month, year) + this.getLastDayOfMonth(month, year)); i++) {
      html += '<div class="day-item date-item-before fw-100">';
      html += (i+1);
      html += '</div>'; 
    }

    html += '</div>';

    return html;

  }

  insertDayNames = () => {

    var html = "";

    html += '<div class="d-flex align-center flex-grow">';

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

  }

  renderStreamEvents = (index: number, month: number, year: number) => {

    const lastDay = this.getLastDayOfMonth(month, year);

    var html = '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

    for(var i = 1; i <= lastDay; i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + i).slice(-2);
      if(this.events[mmdd] != null) {
        //html += '<div>'+month + ',' + year + ',' + i+'</div>'
        html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
          html += '<div>'+("0" + i).slice(-2)+' |</div>';
          for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
            html += '<div class="stream-events-container flex-grow">';
              html += '<table>';
              html += '<thead>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                html += '<th part="td-head">';
                html += Object.keys(this.events[mmdd][j])[k];
                html += '</th>';
              }
              html += '</thead>';
              html += '<tbody>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                html += '<th part="td-body">';
                if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                  html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                } else {
                  html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
                }
                
                html += '</th>';
              }
              html += '</tbody>';
              html += '</table>';
            html += '</div>';
          }
        html += '</div>';
      } else {
        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
        html += '<div>'+("0" + i).slice(-2)+' | ---</div>';
        html += '</div>';
      }
      

    }

    html += '</div>'

    return html;

  }

  renderStream = (index: number = 0) => {

    console.log('renderstream', index);

    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    var html = '';

    html += '<div class="d-flex flex-grow">';
      html += '<div class="calendar-left-col">';

        var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

        for(var i = 0; i < 12; i++) {

          var part = "";

          if(i === index) {
            part = "stream-month-selected";
          } else {
            part = "stream-month-not-selected";
          }

          html += '<div part="'+part+'" id="stream-month-'+i+'" part="month-title" class="title-item '+part+'">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
          startDate.setMonth(startDate.getMonth() + 1);
        }

      html += '</div>';
      html += '<div class="calendar-right-data">';

        startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
        for(i = 0; i < 12; i++) {
          if(i === index) {
            console.log(i, index)
            html += this.renderStreamEvents(i, startDate.getMonth(), startDate.getFullYear())
          }
          startDate.setMonth(startDate.getMonth() + 1);
        }
      html += '</div>';
    html += '</div>';

    (this._SfStreamContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < 12; i++) {
      (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {

        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        this.renderStream(target);

      })
    }

  }

  renderCalendar = () => {

    console.log('redering calendar', this.events);

    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    var html = '';

    for(var i = 0; i < 12; i++) {

      html += '<div class="calendar-item d-flex flex-col flex-grow" part="calendar-month">';
      html += '<div class="d-flex justify-between align-center">';
      html += '<div part="month-title" class="title-item">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
      html += '<button id="calendar-button-'+i+'" part="button-icon-small" class="title-item material-icons">open_in_new</button>'
      html += '</div>';
      html += this.insertDayNames();
      html += this.insertDates(startDate.getMonth(), startDate.getFullYear());
      html += '</div>';

      startDate.setMonth(startDate.getMonth() + 1);
  
    }

    (this._SfCalendarContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < 12; i++) {

      (this._SfCalendarContainer as HTMLDivElement).querySelector('#calendar-button-' + i)?.addEventListener('click', (ev: any) => {

        const id = (ev.target as HTMLButtonElement).id.split("-")[2];
        this.enableStream(true);
        this.renderStream(parseInt(id));

      })

    }

  }

  processEvent = (value: any) => {

    console.log('processing due date', value.duedate.replace(/['"]+/g, ''));
    const duedateArr = value.duedate.replace(/['"]+/g, '').split(",") as Array<string>;

    const startMonth = parseInt(this.calendarStartMM);

    for(var i = 0; i < duedateArr.length; i++) {

      const dateArr = duedateArr[i].split("/");
      console.log('datearr', dateArr);

      if(dateArr[2] == "*") {
        if(dateArr[1] == "*") {

          var j = startMonth;

          while(true) {

            console.log('processing event',dateArr[2],dateArr[1],j);

            const mmdd =  ("0" +j).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);

            if(this.events == null) {
              this.events = {};
            }
            if(this.events[mmdd] == null) {
              this.events[mmdd] = [];
            }
            (this.events[mmdd] as Array<any>).push(value);


            if(startMonth !== 12) {

              if(j === (startMonth - 1)) {
                break;
              }
            }


            j++;

            if(j === 13) {
              j = 0;
            }

          } 

        } else {

            const mmdd =  ("0" +(parseInt(dateArr[1]))).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);

            if(this.events == null) {
              this.events = {};
            }
            if(this.events[mmdd] == null) {
              this.events[mmdd] = [];
            }
            (this.events[mmdd] as Array<any>).push(value);

        }
      }

    }

    console.log('calendar processed', this.calendar);
    console.log('event processed', this.events);

  }

  fetchDetail = async (value: any) => {

    const body: any = this.getApiBodyList();
    body.id = value;
    console.log('detail', value, body);
    let url = "https://"+this.apiIdDetail+".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodDetail;

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse', jsonRespose);
      this.processEvent(jsonRespose.data.value)
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchList = async () => {

    console.log('calendar fetching list', this.apiIdList);

    const body: any = this.getApiBodyList();

    if(this.apiIdList != null) {

      let url = "https://"+this.apiIdList+".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodList;

      console.log('calendar request body', body);
      console.log('calendar request url', url);

      const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';
      if(xhr.status == 200) {

        const jsonRespose = JSON.parse(xhr.responseText);
        const fieldArr = JSON.parse(jsonRespose.data.value[this.apiResponseFieldList]) as Array<string>;

        for(var i = 0; i < fieldArr.length; i++) {

          console.log('events', fieldArr[i]);
          await this.fetchDetail(fieldArr[i])

        }
        
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    }

  }

  initCalendar = async () => {

    var newDate = null;
    var newMonth = null;
    var newYear = null;
    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    console.log('startDate', startDate);
    
    do {

      this.calendar.push(startDate);
      startDate.setDate(startDate.getDate() + 1);

      newDate = ("0" + startDate.getDate()).slice(-2);
      newMonth = ("0" + startDate.getMonth()).slice(-2);
      newYear = (startDate.getFullYear());

    } while(!(newDate == this.calendarStartDD && newMonth == (("0" + ((parseInt(this.calendarStartMM) - 1) + "")).slice(-2)) && newYear === (parseInt(this.calendarStartYYYY) + 1)));

    console.log(this.calendar);

  }

  initInputs = () => {

    this.calendarStartDD = ("0" + this.calendarStartDD).slice(-2);
    this.calendarStartMM = ("0" + this.calendarStartMM).slice(-2);

  }

  initListeners = () => {

    
  }

  loadMode = async () => {

    this.enableStream(false);
    this.initListeners();
    this.initInputs();
    this.initCalendar();

    console.log('calendar init done');

    await this.fetchList();
    
    if(this.events != null) {
      this.renderCalendar();
      this.renderStream();
    }

  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    this.loadMode();

  }
  
  override connectedCallback() {
    super.connectedCallback()
  }
  
  override render() {

    return html`
          
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="SfIEventsC">
        
        <div class="d-flex justify-center">
            <div class="loader-element"></div>
        </div>
        <div class="d-flex justify-center">
          <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="calendar-container">
            
          </div>
          <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="stream-container">
            
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

}


declare global {
  interface HTMLElementTagNameMap {
    'sf-i-events': SfIEvents;
  }
}
