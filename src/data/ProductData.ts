import { Product } from "../models/product.model";

const ProductData: Product[] = [
  {
    id: 0,
    name: "Giày Thể Thao Nam Biti's Hunter Street DSMH10400",
    description: `The Americano is another popular type of coffee drink, and it's very easy to make! It's just espresso with hot water dripping over it. The name came about during World War II when European baristas added water to their espresso drinks for the American soldiers stationed there. The resulting drink had a smoother, less concentrated flavour than espresso and thus the Americano was born.`,
    roasted: 'Medium Roasted',
    image:
      'https://product.hstatic.net/1000230642/product/-the-thao-nam-hunter-street-white-dsmh10400trg-trang-nyvaw-color-trang_d3895e976e4045a39e15791698766eb1.jpg',
    ingredients: 'Milk',
    prices: [
      {size: 'S', price: '1.000.000', currency: '₫'},
      {size: 'M', price: '3.15', currency: '$'},
      {size: 'L', price: '4.29', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Coffee',
    displayOrder: 0,
    discount: 20,
    discountType: '%',
    shop: {
      id: 11,
      location: {
        latitude: 10.800875,
        longitude: 106.629518,
      },
      logo: 'https://yt3.ggpht.com/FnAKX8TH4yzJtm5NkPV5LFyHC1BCgN-PUsxmko9AOc0UgqxYKArCmaKU6casaCk0PQd536x0eg=s88-c-k-c0x00ffffff-no-rj',
      name: "Bitit's",
      status: 'Open',
      totalProduct: 100,
      totalReview: 200,
    }
  },
  {
    id: 1,
    name: "Giày Thể Thao Nam Biti's Hunter Street Còn Gì Dùng Đó HSM006302",
    description: `Những đôi giày được tạo nên từ những mảnh ghép tưởng chừng đã bị lãng quên, Biti’s tiếp tục minh chứng cho nỗ lực bền bỉ của mình trên con đường theo đuổi kỷ nguyên Xanh với 3 trụ cột Products - People - Planet với BST “CÒN-GÌ-DÙNG-ĐÓ” 3.0 hoàn toàn MỚI!!!`,
    roasted: 'Medium Roasted',
    image:
      'https://product.hstatic.net/1000230642/product/hsm006302doo__2__4534a9f708124b2ab76e240c07000132.jpg',
    ingredients: 'Milk',
    prices: [
      {size: 'S', price: '1.38', currency: '$'},
      {size: 'M', price: '3.15', currency: '$'},
      {size: 'L', price: '4.29', currency: '$'},
    ],
    average_rating: 4.0,
    ratings_count: '6,879',
    favourite: true,
    type: 'Coffee',
    displayOrder: 0,
    discount: 5,
    discountType: '%',
    shop: {
      id: 12,
      location: {
        latitude: 10.800875,
        longitude: 106.629518,
      },
      logo: 'https://yt3.ggpht.com/FnAKX8TH4yzJtm5NkPV5LFyHC1BCgN-PUsxmko9AOc0UgqxYKArCmaKU6casaCk0PQd536x0eg=s88-c-k-c0x00ffffff-no-rj',
      name: "5S Fashion",
      status: 'Open',
      totalProduct: 100,
      totalReview: 200,
    }
  },
  {
    id: 2,
    name: "Giày Thể Thao Nam Biti's Hunter Street Còn Gì Dùng Đó HSM006300",
    description: `Những đôi giày được tạo nên từ những mảnh ghép tưởng chừng đã bị lãng quên, Biti’s tiếp tục minh chứng cho nỗ lực bền bỉ của mình trên con đường theo đuổi kỷ nguyên Xanh với 3 trụ cột Products - People - Planet với BST “CÒN-GÌ-DÙNG-ĐÓ” 3.0 hoàn toàn MỚI!!!`,
    roasted: 'Medium Roasted',
    image:
      'https://product.hstatic.net/1000230642/product/hsm006300nau__2__49db3ccdb8bc4c82a94402a944931e4d_1024x1024.jpg',
    ingredients: 'Milk',
    prices: [
      {size: '39', price: '814,000', currency: '₫'},
      {size: 'M', price: '3.15', currency: '$'},
      {size: 'L', price: '4.29', currency: '$'},
    ],
    average_rating: 4.8,
    ratings_count: '6,879',
    favourite: false,
    type: 'Coffee',
    displayOrder: 0,
    discount: 0,
    discountType: '%',
    shop: {
      id: 11,
      location: {
        latitude: 10.800875,
        longitude: 106.629518,
      },
      logo: 'https://yt3.ggpht.com/FnAKX8TH4yzJtm5NkPV5LFyHC1BCgN-PUsxmko9AOc0UgqxYKArCmaKU6casaCk0PQd536x0eg=s88-c-k-c0x00ffffff-no-rj',
      name: "Bitit's",
      status: 'Open',
      totalProduct: 100,
      totalReview: 200,
    }
  },
];

  export default ProductData;