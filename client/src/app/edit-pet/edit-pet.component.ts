import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  new_nameErrors = "";
  new_typeErrors = "";
  new_descErrors = "";
  new_validPet = true;

  editPet = { name : "" , type : "" , description : "", skills : [{skill : ""},{skill : ""},{skill : ""}]}
  delOrRetrErrors = "";

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.getPetById(params['id'])
    })
  }

  getPetById(ID) {
    console.log("Get getPet by ID in component", ID)
    this.delOrRetrErrors = "";
    let obs = this._httpService.getPetByID(ID);
    obs.subscribe(data => {
      console.log("Get getPet by ID in  component - data", data)
      if (data['message'] == 'success') {
        console.log("Get getPet by ID in  component - Success", data)
        this.editPet = data['data'];
      }
      else if (data['message'] == 'error') {
        console.log("Get getPet by ID in  component - Error", data['data'])
        this.delOrRetrErrors = "Error retreiving the Products"
      }
    })
  }

  updatePet() {
    console.log("Update getPet by ID - in component");
    this.new_nameErrors = "";
    this.new_typeErrors = "";
    this.new_descErrors = "";
    // this.editPet['skills'] = [];
    // this.editPet['skills'].push({"skill" : this.editPet.skill1});
    // this.editPet['skills'].push({"skill" : this.editPet.skill2});
    // this.editPet['skills'].push({"skill" : this.editPet.skill3});
    let obs = this._httpService.updatePetByID(this.editPet['_id'], this.editPet);
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
              this.new_nameErrors += data['data'].errors.name.message  + " ";
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
          this.new_nameErrors = "";
          this.new_typeErrors = "";
          this.new_descErrors = "";
          this.router.navigate([`/details/${this.editPet['_id']}`]);
        }
      }
    });
  }

  onCancel() {
    console.log("goto to pets details page")
    this.router.navigate([`/details/${this.editPet['_id']}`]);
  }
}
