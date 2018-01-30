import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.css']
})
export class ListPetsComponent implements OnInit {

  delOrRetrErrors = "";
  pets: any;
  edit = false;
  editPet: any;
  enableDelete = false;
  now: any;
  time_diff: any;
  refresh: any;

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getPets();
  }

  getPets() {
    console.log("Get all pets in component")
    this.delOrRetrErrors = "";
    let obs = this._httpService.getPets();
    obs.subscribe(data => {
      console.log("Get all pets in component - data", data)
      if (data['message'] == 'success') {
        console.log("Get all pets in component - Success", data)
        this.pets = data['data'];
      }
      else if (data['message'] == 'error') {
        console.log("Get all pets in component - Error", data['data'])
        this.delOrRetrErrors = "Error retreiving the Pets"
      }
    })
  }

  getPetDetails(ID) {
    console.log("get pet details");
    this.router.navigate([`/details/${ID}`]);
  }

  updatePet(pet) {
    console.log("call update - edit component", pet)
    this.router.navigate([`/edit/${pet._id}`]);
  }

}
