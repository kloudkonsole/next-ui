/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { connect } from 'umi';
import { Table } from 'antd';

const columns = [{
	title: 'ID',
	dataIndex: ['d', 'id'],
	key: 'id'
}, {
	title: 'Reference',
	dataIndex: ['d','ref'],
	key: 'ref'
}, {
	title: 'State',
	dataIndex: ['d','state'],
	key: 'state'
}, {
	title: 'Organization',
	dataIndex: ['d','org'],
	key: 'org'
}];

const SKUPage = (props) => {
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

	return <Table dataSource={dataSource} columns={columns} rowKey='i' />;
}

export default connect(({ sku }) => ({
  skuModel: sku,
}))(SKUPage);