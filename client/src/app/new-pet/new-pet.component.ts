import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {

  new_Pet = { name: "", type: "", description: "", skill1: "", skill2: "", skill3: "" }
  new_nameErrors = "";
  new_typeErrors = "";
  new_descErrors = "";
  new_validPet = true;

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }


  createPet() {
    console.log("Create new pets in component")
    this.new_nameErrors = "";
    this.new_typeErrors = "";
    this.new_descErrors = "";
    this.new_Pet['skills'] = [];
    this.new_Pet['skills'].push({ "skill": this.new_Pet.skill1 });
    this.new_Pet['skills'].push({ "skill": this.new_Pet.skill2 });
    this.new_Pet['skills'].push({ "skill": this.new_Pet.skill3 });
    let obs = this._httpService.createPet(this.new_Pet);
    obs.subscribe(data => {
      if (data['message']) {
        if (data['message'] == 'error') {
          if (data['data'].code) {
            console.log("Create new pets in component - duplicate error", data['data'].code)
            this.new_nameErrors += "Pet name already exists" + " ";
          }
          if (data['data'].errors) {
            if (data['data'].errors.name) {
              console.log("Create new pets in component - name error", data['data'])
              this.new_nameErrors += data['data'].errors.name.message + " ";
            }
            if (data['data'].errors.type) {
              console.log("Create new pets in component - type error", data['data'])
              this.new_typeErrors += data['data'].errors.type.message + " ";
            }
            if (data['data'].errors.description) {
              console.log("Create new pets in component - description error", data['data'])
              this.new_descErrors += data['data'].errors.description.message + " ";
            }
          }
        }
        else {
          this.new_validPet = false;
          this.new_Pet = { name: "", type: "", description: "", skill1: "", skill2: "", skill3: "" }
          this.new_nameErrors = "";
          this.new_typeErrors = "";
          this.new_descErrors = "";
          this.gotoPetsList();
        }
      }
    });
  }

  gotoPetsList() {
    console.log("goto to pets page")
    this.router.navigate(['/']);
  }

  onCancel() {
    console.log("goto to pets page")
    this.router.navigate(['/']);
  }
}
