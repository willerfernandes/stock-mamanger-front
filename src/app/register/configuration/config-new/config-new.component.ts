import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfigurationService } from './../../../services/configuration.service';
import { Config } from './../config/config';

@Component({
  selector: 'app-config-new',
  templateUrl: './config-new.component.html',
  styleUrls: ['./config-new.component.css']
})
export class ConfigNewComponent implements OnInit {

  @Input() configuration: Config;

  constructor(private configurationService: ConfigurationService, private route: ActivatedRoute, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  save(key: string, value: string) {
    this.configurationService.save(this.fillConfiguration(0, key, value)).subscribe((res) => {
      this.goBack()
    });
  }

  fillConfiguration(id: number, key: string, value: string): Config {
    const config: Config = { id: 0, chave: '', valor: '' };
    config.id = id;
    config.chave = key;
    config.valor = value;
    return config;
  }

  ngOnInit() {
  }

}
