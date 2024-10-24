import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private housingService: HousingService = inject(HousingService);
  private housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  
  constructor() {
    this.housingService.gettingAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList
      });
  }

  filterResult(search: string) {
    if (!search) this.filteredLocationList = this.housingLocationList;
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation.city.toLowerCase().includes(search.toLowerCase())
    );
  }
}
