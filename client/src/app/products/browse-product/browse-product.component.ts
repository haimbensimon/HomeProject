import { Component } from '@angular/core';
import { ProductServiceService } from 'src/app/product-service.service';

@Component({
  selector: 'app-browse-product',
  templateUrl: './browse-product.component.html',
  styleUrls: ['./browse-product.component.css'],
})
export class BrowseProductComponent implements OnInit {
  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.getALlCategories();
  }

  getAllProductus() {
    this.productService.getAllProduct().subscribe(
      (result) => {
        console.log(result);
      },
      (error) => console.log(error)
    );
  }

  getALlCategories() {
    this.productService.getAllCategory().subscribe(
      (result) => {
        console.log(result);
      },
      (error) => console.log(error)
    );
  }
}
