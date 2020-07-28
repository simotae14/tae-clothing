import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from './../../components/collection-preview/collection-preview.component';

import {
  CollectionOverviewContainer
} from './collections-overview.styles';

const CollectionsOverview = ({ collections }) => (
  <CollectionOverviewContainer>
    {
      collections.map(({id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
  </CollectionOverviewContainer>  
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);