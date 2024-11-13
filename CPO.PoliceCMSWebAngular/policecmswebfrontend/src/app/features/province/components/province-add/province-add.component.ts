import { Component } from '@angular/core';
import { Province } from '../../models/province.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinceService } from '../../services/province.service';

@Component({
  selector: 'app-province-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './province-add.component.html',
  styleUrl: './province-add.component.scss'
  
})
export class ProvinceAddComponent {
  addProvinceForm: FormGroup;
  // province: Province = {
  //   id: 0,
  //   provincename: '',
  //   createdby: 0
  // };
  constructor(private fb: FormBuilder, private provinceService: ProvinceService, private router: Router) {

    this.addProvinceForm = this.fb.group({
      id:[0],
      provincename: ['', Validators.required],
      createdBy: [0]
    });
  }

  onSubmit():void {
    // Handle form submission for adding a new province
    if (this.addProvinceForm.valid) {


      const newProvince: Province = {
        id: 0,
        provincename: this.addProvinceForm.get('provincename')?.value,
        createdby: 1
      };

      //const province = this.addProvinceForm.value;
      this.provinceService.addProvince(newProvince).subscribe(() => {
        this.router.navigate(['/province']);
      });
    }
  }
}
