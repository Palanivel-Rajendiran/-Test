import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService, AppDataService } from '../../../../@core/utils';
import _ from 'lodash';

@Component({
  selector: 'ngx-map-product-attributes',
  templateUrl: './map-product-attributes.component.html',
  styleUrls: ['./map-product-attributes.component.scss']
})
export class MapProductAttributesComponent implements OnInit {

  @Input('group')
  productAttrForm: FormGroup;
  attributeValueTypeCodes: any[];
  constructor(private AppDataService: AppDataService, private ApiService: ApiService) { }

  ngOnInit() {
    this.initPopulateAttrTypeList();
  }

  private initPopulateAttrTypeList() {
    const params = {
      type_Code: 'ATTR-TYP-CD'
    };
    this.ApiService.attributeValueTypeCodes(params).subscribe(
      (resp: any) => {
        this.attributeValueTypeCodes = resp.data;
      },
      error => console.log(error),
    );
  }

}
