import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import {
  updateCollections
} from '../../redux/shop/shop.action';

class ShopPage extends Component {
  // function to unsuscribe the snapshot
  unsuscribeFromSnapshot = null;
  componentDidMount() {
    const {
      updateCollections
    } = this.props;
    
    // collectio ref
    const collectionRef = firestore.collection('collections');

    // take the snapshot of the reference
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
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

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);