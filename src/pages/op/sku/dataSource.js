/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export default function useSKUDataSource(props) {
	const { skuModel, dispatch } = props;
	const [dataSource, setDataSource] = useState([])

	useEffect(() => {
		dispatch({
			type: 'sku/list',
		})
	}, [])

	useEffect(() => {
		setDataSource(Object.values(skuModel))
	}, [skuModel])

  return dataSource;
}