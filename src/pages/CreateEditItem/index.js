import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker';

import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import * as itemActions from '~/ducks/Item';

import { Container, ItemForm } from '~/components'
import styles from './styles'

const options = {
  title: 'Selecionar foto',
  takePhotoButtonTitle: 'Tirar foto',
  chooseFromLibraryButtonTitle: 'Escolher Foto',
  cancelButtonTitle: 'Fechar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class CreateEditItem extends Component {
  state = {
    initialValues: false,
    photoSource: false
  }

  componentDidMount() {
    const { route } = this.props

    if (route.params && route.params.item) {
      this.setState({ initialValues: route.params.item })
    }
  }

  handlePress = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.warn(response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = response

        this.setState({
          photoSource: source,
        });
      }
    });
  }

  onSubmit = (values) => {
    const {
      createItem,
      editItem,
      navigation,
      route: { params }
    } = this.props
    console.warn(this.props)
    const { photoSource } = this.state

    const updatedValues = {
      ...values,
      image: photoSource.data
    }

    if (params && params.item) {
      editItem(params.constructionId, params.floorId, updatedValues)
    } else {
      createItem(params.constructionId, params.floorId, updatedValues)
    }

    // navigation.navigate('FloorDetail')
    navigation.goBack()
  }

  render() {
    const { initialValues, photoSource } = this.state

    return (
      <Container hasScrollView>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={this.handlePress}
            style={styles.image}
          >
            {photoSource ? (
              <Image style={{ height: 300, width: 300 }} source={photoSource} />
            ) : (
              <Icon style={styles.icon} name='md-add' size={40} />
            )}
          </TouchableOpacity>
          <ItemForm
            initialValues={initialValues}
            onSubmit={this.onSubmit}
          />
        </View>
      </Container>
    )
  }
}

CreateEditItem.propTypes = {
  createItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => {
  const { createItem, editItem } = itemActions

  return (
    bindActionCreators({
      createItem,
      editItem,
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditItem)
