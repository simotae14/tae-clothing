import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

class ShopPage extends Component {
  // function to unsuscribe the snapshot
  unsuscribeFromSnapshot = null;
  componentDidMount() {
    // collectio ref
    const collectionRef = firestore.collection('collections');

    // take the snapshot of the reference
    collectionRef.onSnapshot(async snapshot => {
      convertCollectionSnapshotToMap(snapshot);
    });
  }
  render() {
    const {
      match
    } = this.props;
    return (
      <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />  
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div> 
    );
  }
};

export default ShopPage;