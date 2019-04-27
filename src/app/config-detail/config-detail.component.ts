import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ConfigurationService} from './../configuration.service';
import {Config} from './../config/config';


@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.css']
})
export class ConfigDetailComponent implements OnInit {

 	@Input() configuration: Config;

	constructor(private configurationService: ConfigurationService, private route: ActivatedRoute, private location: Location) {}

	getConfiguration(){
		const id = +this.route.snapshot.paramMap.get('id');

		this.configurationService.get(id).subscribe((res) =>{
			console.log(res);
    		this.configuration = res;
    });
	}

	goBack(): void {
    this.location.back();
  	}

  	save(){
     this.configurationService.update(this.configuration).subscribe((res) =>{
        goBack()
    });
  }

	ngOnInit() {
		this.getConfiguration();

	}

}
