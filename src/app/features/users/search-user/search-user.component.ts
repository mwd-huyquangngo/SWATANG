import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants, SearchMethod } from '@shared/constants';
import { User } from '@core/models';
import { AlertService, UserService } from '@core/services';
import { JsonConvert } from 'json2typescript';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  searchUserForm: FormGroup;
  submitted = false;
  jsonConvert: JsonConvert;
  users: User[];
  isNotFound = false;
  isShowResult = false;
  searchMethodSelected = SearchMethod.Name;
  maxLengthSearch = Constants.MAX_LENGTH_SEARCH;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService) {
    this.jsonConvert = new JsonConvert;
  }

  ngOnInit() {
    this.searchUserForm = this.formBuilder.group({
      keyword: ['', [Validators.required]],
      searchMethod: [SearchMethod.Name]
    });
    this.users = [];
  }

  get f() {
    return this.searchUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.searchUserForm.invalid) {
      this.isShowResult = false;
      return;
    }

    const keyValue = this.f.keyword.value;
    const searchMethod = this.f.searchMethod.value;

    if (keyValue) {
      this.userService.search(this.processSearchInput(keyValue), searchMethod)
        .subscribe(
          users => {
            this.users = users;
            this.isShowResult = true;
            this.isNotFound = this.users.length === 0;
          },
          error => {
            this.alertService.error(error);
            this.submitted = false;
            this.isShowResult = false;
          });
    }
  }

  processSearchInput(keyValue: string): string {
    let searchKeyword = keyValue;

    if (searchKeyword.length > this.maxLengthSearch) {
      searchKeyword = searchKeyword.substr(0, this.maxLengthSearch);
      this.f.keyword.setValue(searchKeyword);
    }

    searchKeyword = encodeURIComponent(searchKeyword);

    return searchKeyword;
  }
}
