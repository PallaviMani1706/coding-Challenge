import { LightningElement, wire, api, track } from 'lwc';
import { showToastEvent} from 'lightning/platformShowToastEvent';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {

    contactColumns = [
        { label: 'First Name', fieldName: 'FirstName', sortable: true },
        { label: 'Last Name', fieldName: 'LastName', sortable: true },
        { label: 'Email', fieldName: 'Email', sortable: true }
    ];
    contactData;
    error;
    pageSizeOptions = [5, 10, 25, 50, 75, 100]; //Page size options
    defPgSizePosInArr = 0; //set pageSize with default value as first option
    pageSize; //No.of records to be displayed per page
    totalPages; //Total no.of pages
    pageNumber = 1; //Page number
    totalRecords = 0; //Total no.of records
    consToDisplay = []; //Records to be displayed on the page
    searchedKey = ''; //holds the searched key value
    searchedRecords = []; //holds the list of records that need to be used for displaying data
    sortedBy; 
    sortedDirection = 'asc';
    
    //method to handle first button disable logic
    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    
    //method to handle last button disable logic
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }

    //wire method to get list of contacts from apex call
    @wire(getContacts)
    contacts({ error, data }) {
        if (data) {
            this.contactData = data;
            this.searchedRecords = this.contactData;
            this.totalRecords = data.length; // update total records count
            this.paginationDefaults();
        } 
        else if (error) {
            this.error = error;
            this.dispatchEvent(
                new showToastEvent({
                    title: 'error showing data table',
                    message: error.body.message,
                    variant: error,
                })
            )
        }
    }
    
    //method to handle search logic
    handleKeyChange(event){
      this.searchedKey = event.target.value;
      if(this.searchedKey){
        this.searchedRecords = this.contactData.filter(rec => this.matchesSearchKey(rec));
        this.totalRecords = this.searchedRecords.length;
        this.paginationHelper();
      }
      else{
        this.searchedRecords = this.contactData;
        this.totalRecords = this.contactData.length;
        this.paginationHelper();
      }
    }
    
    //method to match the searched record from the list and retruns that particular record to display
    matchesSearchKey(record){
        const searchString = this.searchedKey.toLowerCase();
        return record?JSON.stringify(record).toLowerCase().includes(searchString):'';
    }

    //method to handle default page
    paginationDefaults(){
        this.pageSize = (this.pageSizeOptions[this.defPgSizePosInArr]); 
        this.paginationHelper();  
    }
    
    //method to handle pageSize
    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }
    
    //method to handle previous page button
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    
    //method to handle next page button
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
    
    //method to handle first page button
    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }
    
    //method to handle last page button
    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }

    //helper menthod to update pagination logic 
    paginationHelper() {
        this.consToDisplay = [];
        if(!this.pageSize){
            this.pageSize = this.totalRecords;
        }
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.consToDisplay.push(this.searchedRecords[i]);
        }
    }
    
    //method to handle sort event
    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.sortData(this.sortedBy,this.sortedDirection);
    }
    
    //method to handle sort logic
    sortData(fieldName, sortDirection){
        var data = JSON.parse(JSON.stringify(this.searchedRecords));
        //function to return the value stored in the field
        var key =(a) => a[fieldName]; 
        var reverse = sortDirection === 'asc' ? 1: -1;
        data.sort((a,b) => {
            let valueA = key(a) ? key(a).toLowerCase() : '';
            let valueB = key(b) ? key(b).toLowerCase() : '';
            return reverse * ((valueA > valueB) - (valueB > valueA));
        });

        //set sorted data to searchedRecords attribute
        this.searchedRecords=data;
        this.paginationHelper();
    }
    
     
}