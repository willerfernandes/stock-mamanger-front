import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ConfigurationService} from './../../../services/configuration.service';
import {Config} from './../config/config';


@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.css']
})
export class ConfigDetailComponent implements OnInit {

 	@Input() configuration: Config;

	constructor(private configurationService: ConfigurationService, private route: ActivatedRoute, private location: Location) {}

	ngOnInit() {
			this.getConfiguration();
		}

	goBack(): void {
    this.location.back();
  	}

	getConfiguration(){
		const id = +this.route.snapshot.paramMap.get('id');
		this.configurationService.get(id).subscribe((res) =>{
    		this.configuration = res;
    });
	}

	

  	save(value: string){
     this.configurationService.update(this.fill(this.configuration.id, this.configuration.chave, value)).subscribe((res) =>{
        this.goBack()
    });
    }


	fill(id: number, key: string, value: string): Config {
		var config: Config = {chave: "", valor: ""}
		config.id = id;
		config.chave = key;
		config.valor = value;
		return config;
	}

	

}
