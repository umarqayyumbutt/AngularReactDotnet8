import { Component } from '@angular/core';
import { Province } from '../../models/province.model';
import { ProvinceService } from '../../services/province.service';
import { Router } from '@angular/router'; // For navigation
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-province-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './province-list.component.html',
  styleUrl: './province-list.component.scss'
})
export class ProvinceListComponent {
  province: Province[] =[];
  errorMessage: string | null = null;
  loading: boolean = true;     // Loading state
  constructor(private provinceService: ProvinceService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    //console.log(token);
    this.loadProvinces();  // Call the method to load provinces on component initialization
  }
   // Method to load the provinces from the API
  loadProvinces() {
    this.provinceService.getProvinces().subscribe(
      (data: Province[]) => {
        this.province = data;  // Assign the fetched data to the provinces array
        this.loading = false;   // Stop loading when data is loaded
      },
      (error) => {
        console.error('Error fetching provinces:', error);
        this.loading = false;   // Stop loading even if there's an error
      }
    );
  }

   // Navigate to the edit page for the selected province
   editProvince(provinceId: number) {
    this.router.navigate(['/province/edit', provinceId]);
  }

  // Navigate to the view page for the selected province
  viewProvince(provinceId: number) {
    this.router.navigate(['/province/view', provinceId]);
  }
  addProvince(): void {
    this.router.navigate(['/province/add']);
  }
  // Method to delete a province
  deleteProvince(provinceId: number) {
    if (confirm('Are you sure you want to delete this province?')) {
      this.provinceService.deleteProvince(provinceId).subscribe(
        () => {
          console.log('Province deleted successfully');
          this.loadProvinces();  // Reload the province list after deletion
        },
        (error) => {
          console.error('Error deleting province:', error);
        }
      );
    }
  }
}
