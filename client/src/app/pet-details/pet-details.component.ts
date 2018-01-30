import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  delOrRetrErrors = "";
  pet = { name: "", type: "", description: "", skill1: "", skill2: "", skill3: "", likes: 0 }
  pet_id = "";
  pet_name = "";
  like = false;

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.like = false;
    this.route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.pet_id = params['id'];
      this.getPetDetails(this.pet_id)
    })
  }


  getPetDetails(ID) {
    console.log("Get all getReviews in component")
    this.delOrRetrErrors = "";
    let obs = this._httpService.getPetByID(ID);
    obs.subscribe(data => {
      console.log("Get all getReviews in component", data)
      if (data['message'] == 'success') {
        console.log("Get all getReviews in component - Success", data['data'].reviews)
        this.pet = data['data'];
        this.pet_name = data['data'].name;
        console.log("skils", this.pet['skills'])
      }
      else if (data['message'] == 'error') {
        console.log("Get all getReviews in component - Error", data['data'])
        this.delOrRetrErrors = "Error retreiving the Products"
      }
    })
  }

  addLikes(ID) {
    // edit pet details and disable like button
    this.like = true;
    this.pet.likes++;
    console.log("Update getPet by ID - in component");
    let obs = this._httpService.updatePetByID(this.pet['_id'], this.pet);
    obs.subscribe(data => {
      if (data['message']) {
        if (data['message'] == 'error') {
          console.log("error")
        }
        else {
          this.getPetDetails(ID)
        }
      }
    });
  }

  destroyPet(ID) {
    this.delOrRetrErrors = "";
    let obs = this._httpService.deletePetByID(ID);
    obs.subscribe(data => {
      if (data['message'] == 'success') {
        this.router.navigate(['/']);
      }
      else if (data['message'] == 'error') {
        console.log("Get all products in component - Error", data['data'])
        this.delOrRetrErrors = "Error deleting"
      }
    })
  }
}

