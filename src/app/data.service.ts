import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

const apiUrl = '/api/test';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getData(): Observable<any> {
    return this.http.get<any>(apiUrl).pipe(
      map(data => {
        console.log('Raw API Response:', data);
        
        const processedData = {
          favouriteColours: this.collateAndSortFavouriteColours(data),
          userDetails: this.calculateAges(data)
        };

        console.log('Processed Data:', processedData);
        
        return processedData;
      })
    );
  }
  private collateAndSortFavouriteColours(data: any[]): any[] {
    const colourCounts: { [key: string]: number } = {};

    data.forEach(item => {
      const favouriteColour = item.favouriteColour;
      colourCounts[favouriteColour] = (colourCounts[favouriteColour] || 0) + 1;
    });

    return Object.entries(colourCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([colour, count]) => ({ colour, count }));
  }

  private calculateAges(data: any[]): any[] {
    const currentDate = new Date();

    return data.map(user => {
      const dob = new Date(user.dob);
      const ageDiff = currentDate.getFullYear() - dob.getFullYear();

      const formattedDob = this.datePipe.transform(dob, 'dd MMMM yyyy');

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        dob: formattedDob,
        currentAge: this.calculateAge(dob),
        agePlus20: this.calculateAge(dob) + 20
      };
    });
  }

  private calculateAge(birthdate: Date): number {
    const currentDate = new Date();
    const birthdateThisYear = new Date(currentDate.getFullYear(), birthdate.getMonth(), birthdate.getDate());

    let age = currentDate.getFullYear() - birthdate.getFullYear();
    if (birthdateThisYear > currentDate) {
      age--;
    }

    return age;
  }
}
