import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchForm: FormGroup;
  constructor() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      teamName : new FormControl(''),
      searchFilter : new FormControl(''),
      role : new FormControl('')
    });
   }

  onSubmit(): void{
  }
  ngOnInit(): void {
  }

}
