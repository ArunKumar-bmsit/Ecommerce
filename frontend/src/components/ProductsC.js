import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProduct from './CardProduct'
import { listProducts, ListproductbyCg, Listproductbyfiter, Listproductbyprice } from '../actions/productActions'
import { BsFilter, AiOutlineSearch, IoMdClose } from 'react-icons/all'
import Search from './Search';
import { NumberInput, NumberInputField, FormLabel, Button, Stack, FormControl, SimpleGrid, Box, Text } from "@chakra-ui/react"
import HashLoader from "react-spinners/HashLoader";
import { Link, Route } from 'react-router-dom'

const ProductsC = ({match,history}) => {
    const [From, setFrom] = useState(0)
    const [To, setTo] = useState(0)
    const [showfilter, setshowfilter] = useState(false);
    const [showsearch, setshowsearch] = useState(false);
    const dispatch = useDispatch();

    const urlParams = new URLSearchParams(window.location.search);
    const Cg = urlParams.get('cg');
    const keyword = urlParams.get('keyword');
    const filterParam = urlParams.get('filter');
    const fromParam = urlParams.get('from');
    const toParam = urlParams.get('to');

    const productList = useSelector((state) => state.productList || {});
    const { loading = false, error = null, products = [] } = productList;
    
    // Sample products data (10 items per category)
    const sampleProducts = [
  // Men
  {
    _id: 'men1',
    name: 'Men T-Shirt 1',
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80'],
    price: 19.99,
    rating: 4.2,
    numReviews: 34,
    description: 'Comfortable cotton T-shirt for men.',
    countInStock: 20,
    category: 'Men',
  },
  {
    _id: 'men2',
    name: 'Men T-Shirt 2',
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80'],
    price: 21.99,
    rating: 4.3,
    numReviews: 28,
    description: 'Stylish slim-fit T-shirt.',
    countInStock: 18,
    category: 'Men',
  },
  {
    _id: 'men3',
    name: 'Men Hoodie 1',
    images: ['https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=500&q=80'],
    price: 39.99,
    rating: 4.6,
    numReviews: 45,
    description: 'Warm fleece hoodie.',
    countInStock: 15,
    category: 'Men',
  },
  {
    _id: 'men4',
    name: 'Men Hoodie 2',
    images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80'],
    price: 42.99,
    rating: 4.5,
    numReviews: 39,
    description: 'Casual hoodie with pockets.',
    countInStock: 12,
    category: 'Men',
  },
  {
    _id: 'men5',
    name: 'Men Jacket 1',
    images: ['https://images.unsplash.com/photo-1520975918318-6a5ae9e3b187?auto=format&fit=crop&w=500&q=80'],
    price: 59.99,
    rating: 4.7,
    numReviews: 22,
    description: 'Water-resistant bomber jacket.',
    countInStock: 10,
    category: 'Men',
  },
  {
    _id: 'men6',
    name: 'Men Jacket 2',
    images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80'],
    price: 64.99,
    rating: 4.4,
    numReviews: 18,
    description: 'Lightweight windbreaker.',
    countInStock: 11,
    category: 'Men',
  },
  {
    _id: 'men7',
    name: 'Men Jeans 1',
    images: ['https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=500&q=80'],
    price: 49.99,
    rating: 4.3,
    numReviews: 30,
    description: 'Classic blue denim jeans.',
    countInStock: 25,
    category: 'Men',
  },
  {
    _id: 'men8',
    name: 'Men Jeans 2',
    images: ['https://images.unsplash.com/photo-1503342394128-c104d54dbaae?auto=format&fit=crop&w=500&q=80'],
    price: 52.99,
    rating: 4.5,
    numReviews: 26,
    description: 'Slim-fit black jeans.',
    countInStock: 30,
    category: 'Men',
  },
  {
    _id: 'men9',
    name: 'Men Shoes 1',
    images: ['https://images.unsplash.com/photo-1603398938378-001ccb5f0e35?auto=format&fit=crop&w=500&q=80'],
    price: 79.99,
    rating: 4.6,
    numReviews: 52,
    description: 'Casual sneakers for men.',
    countInStock: 16,
    category: 'Men',
  },
  {
    _id: 'men10',
    name: 'Men Shoes 2',
    images: ['https://images.unsplash.com/photo-1600180758895-3a4fb4a2fd0c?auto=format&fit=crop&w=500&q=80'],
    price: 85.99,
    rating: 4.7,
    numReviews: 47,
    description: 'Leather loafers.',
    countInStock: 14,
    category: 'Men',
  },

  // Women
  {
    _id: 'women1',
    name: 'Women Dress 1',
    images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80'],
    price: 39.99,
    rating: 4.4,
    numReviews: 33,
    description: 'Floral summer dress.',
    countInStock: 22,
    category: 'Women',
  },
  {
    _id: 'women2',
    name: 'Women Dress 2',
    images: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=500&q=80'],
    price: 42.99,
    rating: 4.5,
    numReviews: 29,
    description: 'Elegant evening dress.',
    countInStock: 19,
    category: 'Women',
  },
  {
    _id: 'women3',
    name: 'Women Top 1',
    images: ['https://images.unsplash.com/photo-1495121605193-b116b5b09e1e?auto=format&fit=crop&w=500&q=80'],
    price: 24.99,
    rating: 4.3,
    numReviews: 21,
    description: 'Casual cotton top.',
    countInStock: 30,
    category: 'Women',
  },
  {
    _id: 'women4',
    name: 'Women Top 2',
    images: ['https://images.unsplash.com/photo-1520975918312-0c220c4df002?auto=format&fit=crop&w=500&q=80'],
    price: 26.99,
    rating: 4.2,
    numReviews: 24,
    description: 'Sleeveless blouse.',
    countInStock: 28,
    category: 'Women',
  },
  {
    _id: 'women5',
    name: 'Women Hoodie 1',
    images: ['https://images.unsplash.com/photo-1533738368-6daa84d8a44b?auto=format&fit=crop&w=500&q=80'],
    price: 44.99,
    rating: 4.6,
    numReviews: 37,
    description: 'Oversized hoodie.',
    countInStock: 17,
    category: 'Women',
  },
  {
    _id: 'women6',
    name: 'Women Hoodie 2',
    images: ['https://images.unsplash.com/photo-1473521140231-c094cfc10b3d?auto=format&fit=crop&w=500&q=80'],
    price: 46.99,
    rating: 4.4,
    numReviews: 32,
    description: 'Zip-up hoodie.',
    countInStock: 15,
    category: 'Women',
  },
  {
    _id: 'women7',
    name: 'Women Jeans 1',
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80'],
    price: 54.99,
    rating: 4.5,
    numReviews: 30,
    description: 'High-waist blue jeans.',
    countInStock: 24,
    category: 'Women',
  },
  {
    _id: 'women8',
    name: 'Women Jeans 2',
    images: ['https://images.unsplash.com/photo-1503341417029-7672ad62247e?auto=format&fit=crop&w=500&q=80'],
    price: 57.99,
    rating: 4.6,
    numReviews: 28,
    description: 'Skinny fit jeans.',
    countInStock: 26,
    category: 'Women',
  },
  {
    _id: 'women9',
    name: 'Women Shoes 1',
    images: ['https://images.unsplash.com/photo-1600180758895-3a4fb4a2fd0c?auto=format&fit=crop&w=500&q=80'],
    price: 74.99,
    rating: 4.7,
    numReviews: 40,
    description: 'Comfort sneakers.',
    countInStock: 20,
    category: 'Women',
  },
  {
    _id: 'women10',
    name: 'Women Shoes 2',
    images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80'],
    price: 79.99,
    rating: 4.8,
    numReviews: 42,
    description: 'Heeled sandals.',
    countInStock: 18,
    category: 'Women',
  },

  // Watches
  {
    _id: 'watch1',
    name: 'Analog Watch 1',
    images: ['https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=500&q=80'],
    price: 129.99,
    rating: 4.5,
    numReviews: 64,
    description: 'Stainless steel analog watch.',
    countInStock: 9,
    category: 'Watches',
  },
  {
    _id: 'watch2',
    name: 'Analog Watch 2',
    images: ['https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=500&q=80'],
    price: 139.99,
    rating: 4.6,
    numReviews: 52,
    description: 'Leather strap watch.',
    countInStock: 11,
    category: 'Watches',
  },
  {
    _id: 'watch3',
    name: 'Digital Watch 1',
    images: ['https://images.unsplash.com/photo-1516815231334-de6f9c6ef65b?auto=format&fit=crop&w=500&q=80'],
    price: 99.99,
    rating: 4.4,
    numReviews: 48,
    description: 'Sport digital watch.',
    countInStock: 14,
    category: 'Watches',
  },
  {
    _id: 'watch4',
    name: 'Digital Watch 2',
    images: ['https://images.unsplash.com/photo-1511381939415-c97bf7b86b0e?auto=format&fit=crop&w=500&q=80'],
    price: 109.99,
    rating: 4.3,
    numReviews: 41,
    description: 'Water-resistant watch.',
    countInStock: 12,
    category: 'Watches',
  },
  {
    _id: 'watch5',
    name: 'Smart Watch 1',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80'],
    price: 199.99,
    rating: 4.7,
    numReviews: 215,
    description: 'Smartwatch with health tracking.',
    countInStock: 15,
    category: 'Watches',
  },
  {
    _id: 'watch6',
    name: 'Smart Watch 2',
    images: ['https://images.unsplash.com/photo-1558981400-3a53112cd5d1?auto=format&fit=crop&w=500&q=80'],
    price: 219.99,
    rating: 4.6,
    numReviews: 180,
    description: 'Smartwatch with GPS.',
    countInStock: 14,
    category: 'Watches',
  },
  {
    _id: 'watch7',
    name: 'Luxury Watch 1',
    images: ['https://images.unsplash.com/photo-1489844097929-c8d5c6398083?auto=format&fit=crop&w=500&q=80'],
    price: 499.99,
    rating: 4.8,
    numReviews: 99,
    description: 'Luxury automatic watch.',
    countInStock: 5,
    category: 'Watches',
  },
  {
    _id: 'watch8',
    name: 'Luxury Watch 2',
    images: ['https://images.unsplash.com/photo-1523275335685-576e01f92e53?auto=format&fit=crop&w=500&q=80'],
    price: 549.99,
    rating: 4.9,
    numReviews: 87,
    description: 'Gold-plated analog watch.',
    countInStock: 4,
    category: 'Watches',
  },
  {
    _id: 'watch9',
    name: 'Minimal Watch 1',
    images: ['https://images.unsplash.com/photo-1512499617640-c2f999098fc5?auto=format&fit=crop&w=500&q=80'],
    price: 149.99,
    rating: 4.4,
    numReviews: 50,
    description: 'Minimalist watch design.',
    countInStock: 8,
    category: 'Watches',
  },
  {
    _id: 'watch10',
    name: 'Minimal Watch 2',
    images: ['https://images.unsplash.com/photo-1512402281564-204233237168?auto=format&fit=crop&w=500&q=80'],
    price: 159.99,
    rating: 4.5,
    numReviews: 46,
    description: 'Matte black watch.',
    countInStock: 9,
    category: 'Watches',
  },

  // Bag
  {
    _id: 'bag1',
    name: 'Backpack 1',
    images: ['https://images.unsplash.com/photo-1585386959984-a41552233f85?auto=format&fit=crop&w=500&q=80'],
    price: 69.99,
    rating: 4.4,
    numReviews: 75,
    description: 'Durable travel backpack.',
    countInStock: 13,
    category: 'Bag',
  },
  {
    _id: 'bag2',
    name: 'Backpack 2',
    images: ['https://images.unsplash.com/photo-1515871204537-9c9cd16c843e?auto=format&fit=crop&w=500&q=80'],
    price: 74.99,
    rating: 4.5,
    numReviews: 62,
    description: 'Laptop backpack.',
    countInStock: 11,
    category: 'Bag',
  },
  {
    _id: 'bag3',
    name: 'Handbag 1',
    images: ['https://images.unsplash.com/photo-1570032257808-36d4b162a019?auto=format&fit=crop&w=500&q=80'],
    price: 89.99,
    rating: 4.6,
    numReviews: 58,
    description: 'Leather handbag.',
    countInStock: 10,
    category: 'Bag',
  },
  {
    _id: 'bag4',
    name: 'Handbag 2',
    images: ['https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=500&q=80'],
    price: 92.99,
    rating: 4.5,
    numReviews: 54,
    description: 'Cross-body handbag.',
    countInStock: 9,
    category: 'Bag',
  },
  {
    _id: 'bag5',
    name: 'Duffel Bag 1',
    images: ['https://images.unsplash.com/photo-1572858245533-1ad0ff0d939c?auto=format&fit=crop&w=500&q=80'],
    price: 64.99,
    rating: 4.4,
    numReviews: 40,
    description: 'Gym duffel bag.',
    countInStock: 14,
    category: 'Bag',
  },
  {
    _id: 'bag6',
    name: 'Duffel Bag 2',
    images: ['https://images.unsplash.com/photo-1582738412305-1258146d83a9?auto=format&fit=crop&w=500&q=80'],
    price: 68.99,
    rating: 4.3,
    numReviews: 38,
    description: 'Weekender bag.',
    countInStock: 12,
    category: 'Bag',
  },
  {
    _id: 'bag7',
    name: 'Messenger Bag 1',
    images: ['https://images.unsplash.com/photo-1517748682273-499cd0fab9d0?auto=format&fit=crop&w=500&q=80'],
    price: 79.99,
    rating: 4.4,
    numReviews: 36,
    description: 'Canvas messenger bag.',
    countInStock: 11,
    category: 'Bag',
  },
  {
    _id: 'bag8',
    name: 'Messenger Bag 2',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'],
    price: 82.99,
    rating: 4.3,
    numReviews: 34,
    description: 'Leather messenger bag.',
    countInStock: 10,
    category: 'Bag',
  },
  {
    _id: 'bag9',
    name: 'Tote Bag 1',
    images: ['https://images.unsplash.com/photo-1542596596-1b06aa0a77b8?auto=format&fit=crop&w=500&q=80'],
    price: 32.99,
    rating: 4.5,
    numReviews: 42,
    description: 'Eco-friendly tote bag.',
    countInStock: 20,
    category: 'Bag',
  },
  {
    _id: 'bag10',
    name: 'Tote Bag 2',
    images: ['https://images.unsplash.com/photo-1555529669-db437e6e18fc?auto=format&fit=crop&w=500&q=80'],
    price: 35.99,
    rating: 4.6,
    numReviews: 40,
    description: 'Canvas tote bag.',
    countInStock: 18,
    category: 'Bag',
  },

  // Shoes
  {
    _id: 'shoe1',
    name: 'Running Shoes 1',
    images: ['https://images.unsplash.com/photo-1600180758895-3a4fb4a2fd0c?auto=format&fit=crop&w=500&q=80'],
    price: 89.99,
    rating: 4.6,
    numReviews: 60,
    description: 'Lightweight running shoes.',
    countInStock: 16,
    category: 'Shoes',
  },
  {
    _id: 'shoe2',
    name: 'Running Shoes 2',
    images: ['https://images.unsplash.com/photo-1600269552042-d0b5de250fb9?auto=format&fit=crop&w=500&q=80'],
    price: 92.99,
    rating: 4.5,
    numReviews: 52,
    description: 'Breathable running shoes.',
    countInStock: 15,
    category: 'Shoes',
  },
  {
    _id: 'shoe3',
    name: 'Sneakers 1',
    images: ['https://images.unsplash.com/photo-1600269452121-1fb0a9fe5c4a?auto=format&fit=crop&w=500&q=80'],
    price: 79.99,
    rating: 4.7,
    numReviews: 70,
    description: 'Classic white sneakers.',
    countInStock: 18,
    category: 'Shoes',
  },
  {
    _id: 'shoe4',
    name: 'Sneakers 2',
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80'],
    price: 82.99,
    rating: 4.6,
    numReviews: 65,
    description: 'Black sleek sneakers.',
    countInStock: 17,
    category: 'Shoes',
  },
  {
    _id: 'shoe5',
    name: 'Boots 1',
    images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80'],
    price: 99.99,
    rating: 4.5,
    numReviews: 48,
    description: 'Leather ankle boots.',
    countInStock: 12,
    category: 'Shoes',
  },
  {
    _id: 'shoe6',
    name: 'Boots 2',
    images: ['https://images.unsplash.com/photo-1600181477440-e9e2f00a4a0d?auto=format&fit=crop&w=500&q=80'],
    price: 104.99,
    rating: 4.4,
    numReviews: 44,
    description: 'Suede boots.',
    countInStock: 11,
    category: 'Shoes',
  },
  {
    _id: 'shoe7',
    name: 'Sandals 1',
    images: ['https://images.unsplash.com/photo-150334145ampanianyisa?auto=format&fit=crop&w=500&q=80'],
    price: 49.99,
    rating: 4.3,
    numReviews: 38,
    description: 'Summer sandals.',
    countInStock: 20,
    category: 'Shoes',
  },
  {
    _id: 'shoe8',
    name: 'Sandals 2',
    images: ['https://images.unsplash.com/photo-1503342294219-388babb69c93?auto=format&fit=crop&w=500&q=80'],
    price: 52.99,
    rating: 4.2,
    numReviews: 35,
    description: 'Beach sandals.',
    countInStock: 22,
    category: 'Shoes',
  },
  {
    _id: 'shoe9',
    name: 'Formal Shoes 1',
    images: ['https://images.unsplash.com/photo-1603398938378-001ccb5f0e35?auto=format&fit=crop&w=500&q=80'],
    price: 109.99,
    rating: 4.6,
    numReviews: 42,
    description: 'Classic formal shoes.',
    countInStock: 10,
    category: 'Shoes',
  },
  {
    _id: 'shoe10',
    name: 'Formal Shoes 2',
    images: ['https://images.unsplash.com/photo-1600181801124-2de49fc52727?auto=format&fit=crop&w=500&q=80'],
    price: 114.99,
    rating: 4.7,
    numReviews: 40,
    description: 'Oxford shoes.',
    countInStock: 9,
    category: 'Shoes',
  }
];

  // Apply client-side filtering as an additional safeguard
  let filteredProducts = products && products.length ? [...products] : [...sampleProducts];

  if (Cg) {
    filteredProducts = filteredProducts.filter(p => p.category === Cg);
  }

  if (fromParam && toParam) {
    const from = Number(fromParam);
    const to = Number(toParam);
    filteredProducts = filteredProducts.filter(p => p.price >= from && p.price <= to);
  }

  if (filterParam === 'Rating') {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (filterParam === 'highprice') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filterParam === 'lowprice') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (keyword) {
    const kw = keyword.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(kw));
  }
useEffect(() => {
    if (Cg) {
        dispatch(ListproductbyCg(Cg));
    } else if (filterParam) {
        dispatch(Listproductbyfiter(filterParam));
    } else if (fromParam && toParam) {
        dispatch(Listproductbyprice(fromParam, toParam));
    } else {
        dispatch(listProducts(keyword || ''));
    }
}, [dispatch, Cg, keyword, filterParam, fromParam, toParam]);

    const searchfunc = () => {
        setshowsearch(!showsearch);
        if (showfilter) {
            setshowfilter(false);
        }
    };

    const filterfunc = () => {
        setshowfilter(!showfilter);
        if (showsearch) {
            setshowsearch(false);
        }
    };
    const pricehandler = ()=>{
        dispatch(Listproductbyprice(From,To))
    }

    return (
        <>
        <div className = 'Cgfilter'>
            <h1>{Cg ? Cg : keyword ?  "*" + keyword + "* Search" : 'All'} Products</h1>
            <div className = 'filtersbtn '>
                <button className = {`filterbtn ${showfilter ? 'activebtn' : ''}`}  
                    onClick = {filterfunc}> 
                    {showfilter ? <IoMdClose size='20'/> : <BsFilter size='20'/>} 
                    Filter
                </button>
                <button className = {`searchbtn ${showsearch ? 'activebtn' : ''}`} onClick = {searchfunc}>
                    {showsearch ? <IoMdClose size='20'/> : <AiOutlineSearch size='20'/>}
                    Search
                </button>
            </div>
        
            <div className = 'filters'> 
                <ul>
                    <Link className='lined' to='?cg'>All</Link>
                    <Link className='lined' to='?cg=Men'>Men</Link>
                    <Link className='lined' to='?cg=Women'>Women</Link>
                    <Link className='lined' to='?cg=Watches'>Watches</Link>
                    <Link className='lined' to='?cg=Shoes'>Shoes</Link>
                    <Link className='lined' to='?cg=Bag'>Bags</Link>
                </ul>
            </div>
        </div>
        {showsearch && <Route render={({history}) => <Search history={history}/>}/>}
        <div className={`filterarea ${showfilter ? 'filter' : 'filteroff'}`}>
            <div className='sortbydiv'>
                <h1>Sort By</h1>
                <ul>
                    <Link onClick={() => setshowfilter(false)} className='lined' to='?filter'>Default</Link>
                    <Link onClick={() => setshowfilter(false)} className='lined' to='?filter=Rating'>Rating</Link>
                    <Link onClick={() => setshowfilter(false)} className='lined' to='?filter=date'>Date</Link>
                    <Link onClick={() => setshowfilter(false)} className='lined' to='?filter=highprice'>Low to high price</Link>
                    <Link onClick={() => setshowfilter(false)} className='lined' to='?filter=lowprice'>High to low price</Link>
                </ul> 
            </div>
            
            {/* Price Range Filter */}
            <div className='pricerange'>
                <h2>Price Range</h2>
                <Stack spacing={4} direction='row' alignItems='center'>
                    <FormControl>
                        <FormLabel>From</FormLabel>
                        <NumberInput min={0} value={From} onChange={(value) => setFrom(value)}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>To</FormLabel>
                        <NumberInput min={0} value={To} onChange={(value) => setTo(value)}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                    <Button colorScheme='blue' mt={8} onClick={pricehandler}>
                        Apply
                    </Button>
                </Stack>
            </div>
        </div>
        
        {/* Products Grid */}
        <Box p={5}>
            {loading ? (
                <Box display='flex' justifyContent='center' alignItems='center' minH='50vh'>
                    <HashLoader color='#3182ce' />
                </Box>
            ) : error ? (
                <Text color='red.500' textAlign='center'>{error}</Text>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
                    {filteredProducts.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))}
                </SimpleGrid>
            )}
        </Box>
        </> 
    )
}

export default ProductsC
