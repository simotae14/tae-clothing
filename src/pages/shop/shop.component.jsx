import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import {
  updateCollections
} from '../../redux/shop/shop.action';

// use the hoc
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    loading: true
  };
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
      // set loading to false
      this.setState({
        loading: false
      });
    });
  }
  render() {
    const {
      match
    } = this.props;
    const {
      loading
    } =  this.state;
    return (
      <div className='shop-page'>
      <Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />  
      <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
    </div> 
    );
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
