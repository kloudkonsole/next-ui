/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import request from '@/utils/request'

function getSKUPage(params) {
   return request('/1.0/sku', {
     method: 'get',
     params
   })
}

export default function useSKUDataSource(props, def = {}) {
	const { skuModel, orgModel, dispatch } = props;
	const [params, setParams] = useState(def)
	const [dataSource, setDataSource] = useState([])
  const { loading, run } = useRequest(getSKUPage, {
    manual: true,
    onSuccess: ({body}) => {
        const skuMissed = []
        const orgMissed = []
        setDataSource(body.map(i => {
          const sku = skuModel[i]
          if (sku) {
            const org = orgModel[sku.d.org]
            if (org){
              sku.d.org = org.d
              return sku
            }
            orgMissed.push(sku.d.org)
            return sku
          }
          skuMissed.push(i)
          return i
        }))

        dispatch({
          type: 'sku/export',
          params: skuMissed
        })

        dispatch({
          type: 'org/export',
          params: orgMissed
        })
    }
  });

	useEffect(() => {
    run(params)
	}, [params])

	useEffect(() => {
    const orgMissed = []
    setDataSource(dataSource.map(i => {
      if (!Number.isFinite(i)) return i
      const sku = skuModel[i]
      if (sku) {
        const org = orgModel[sku.d.org]
        if (org){
          sku.d.org = org.d
          return sku
        }
        orgMissed.push(sku.d.org)
        return sku
      }
      return i
    }))

    dispatch({
      type: 'org/export',
      params: orgMissed
    })

	}, [skuModel])

	useEffect(() => {
    setDataSource(dataSource.map(sku => {
      if (Number.isFinite(sku)) return sku
      const org = orgModel[sku.d.org]
      if (org){
        sku.d.org = org.d
      }
      return sku
    }))
	}, [orgModel])

  return [dataSource, setParams, loading];
}