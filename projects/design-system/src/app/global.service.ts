import { Injectable } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { Query } from '@sinequa/core/app-utils';
import { Results } from '@sinequa/core/web-services';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  query: Query = new Query('training_query');
  results: Results;

  constructor(private searchService: SearchService) {
    this.search();
  }

  search(): void {
    /** Trigger the search with the new criteria */
    this.searchService.getResults(this.query)
      .subscribe(results => {
        console.log('results', results);
        this.results = results;
      });
  }
}
