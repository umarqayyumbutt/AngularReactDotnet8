import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProvinceService } from '../../services/province.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Province } from '../../models/province.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-province-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './province-edit.component.html',
  styleUrl: './province-edit.component.scss'
})
export class ProvinceEditComponent {
  editProvinceForm: FormGroup;
  provinceId: number;

  constructor(private fb: FormBuilder, 
    private provinceService: ProvinceService, 
    private route: ActivatedRoute, 
    private router: Router)
    {
      this.editProvinceForm=this.fb.group({
        provincename: ['', Validators.required],
        createdBy: [0]  // Add createdBy field if necessary
      });
      this.provinceId=this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
      // Fetch province data when the component loads
      this.provinceService.getProvinceById(this.provinceId).subscribe(
        (province: Province) => {
          // Prepopulate the form with existing province data
          this.editProvinceForm.patchValue({
            provincename: province.provincename,
            createdBy: province.createdby
          });
        },
        error => {
          console.error('Error fetching province data', error);
        }
      );
    }
    onSubmit(): void {
      if (this.editProvinceForm.valid) {
        // Prepare the updated Province object
        const updatedProvince: Province = {
          id: this.provinceId,  // Use the existing province ID
          provincename: this.editProvinceForm.get('provincename')?.value,
          createdby: this.editProvinceForm.get('createdby')?.value
        };
  
        // Call the update service
        this.provinceService.updateProvince(updatedProvince).subscribe(
          () => {
            // Navigate back to the province list on success
            this.router.navigate(['/provinces']);
          },
          error => {
            console.error('Error updating province', error);
          }
        );
      }
    }
    cancel(): void {
      this.router.navigate(['/provinces']);  // Navigate back to the province list or any other desired route
    }
}
