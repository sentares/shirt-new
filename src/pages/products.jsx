import { useEffect, useState } from 'react'
import { Categories } from '../components/categories/categories'
import { ProductItems } from '../components/product-items/product-items'
import { Sort } from '../components/sort/sort'
import { Skeleton } from '../components/product-items/skeleton'

const URL = 'https://635fd28a3e8f65f283bc690d.mockapi.io/products?'

export const Products = () => {
	const [loading, setLoading] = useState(true)
	const [items, setItems] = useState([])
	const [activeCategory, setActiveCategory] = useState(0)
	const [activeSort, setActiveSort] = useState(
		{ name: 'popularity', sorting: 'rating' },
		{ name: 'price', sorting: 'price' },
		{ name: 'alphabetically', sorting: 'alphabetically' }
	)

	useEffect(() => {
		setLoading(true)
		fetch(
			`${URL}${activeCategory > 0 ? `category=${activeCategory}` : ''}&sortBy=${
				activeSort.sorting
			}&order=desc`
		)
			.then(arr => arr.json())
			.then(data => {
				setItems(data)
				setLoading(false)
			})
	}, [activeCategory, activeSort])

	return (
		<>
			<div className='content__top'>
				<Categories
					value={activeCategory}
					onChangeCategory={i => setActiveCategory(i)}
				/>
				<Sort sortValue={activeSort} onChangeSort={i => setActiveSort(i)} />
			</div>
			<h2
				className='content__title'
				style={{ marginBottom: '50px', marginTop: '50px' }}
			>
				Choose
			</h2>
			<div className='content__items'>
				{loading
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: items.map(obj => <ProductItems key={obj.id} {...obj} />)}
			</div>
		</>
	)
}

/* <ProductItems {...obj} key={obj.id} /> */
