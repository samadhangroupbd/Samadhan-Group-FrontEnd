import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000',
    padding: 20,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  container: {
    border: '4px solid #ea580c',
    borderRadius: 8,
    padding: 15,
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
  },
  watermark: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    opacity: 0.05,
    width: 180,  // Adjust size of the watermark image
    height: 180,
    top: '45%',
    left: '45%',
    transform: 'translate(-50%, -50%)'
  },
  cornerImage: {
    position: 'absolute',
    width: 100,
    height: 100,
    opacity: 0.8,
    rotate: '360deg'
  },
  centeredText: {
    fontSize: 10,
    // padding: 8,
    width: '100%',
    color: 'white',
  },
  header: {
    marginBottom: 40,
    position: 'relative',
    zIndex: 1,
    alignItems: 'center'
  },
  title: {
    color: '#ea580c',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 15
  },
  subtitle: {
    fontSize: 18,
    letterSpacing: 4,
    marginTop: 8,
    textAlign: 'center',
    color: 'white'
  },
  divider: {
    width: 100,
    height: 2,
    backgroundColor: '#eab308',
    marginVertical: 15,
    alignSelf: 'center'
  },
  recipient: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center'
  },
  name: {
    color: '#ea580c',
    fontSize: 30,
    marginVertical: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 1.5,
    maxWidth: 500,
    marginHorizontal: 'auto',
    marginBottom: 15,
    textAlign: 'center'
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 40  // Added horizontal padding for proper spacing
  },
  signatureItem: {
    alignItems: 'flex-start', // Align items to the left
    textAlign: 'left',  // Ensures left alignment for both label and value
    width: '45%',  // Ensures the items align properly within the container
  },
  signatureItems: {
    alignItems: 'flex-end', // Align items to the left
    textAlign: 'right',  // Ensures left alignment for both label and value
    width: '45%',  // Ensures the items align properly within the container
  },
  signatureLine: {
    width: '50%', // Makes the signature line fill the available width
    height: 1,
    backgroundColor: '#eab308',
    marginVertical: 5
  }
});

const CertificatePDF = ({ admin }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.container}>
        {/* Watermark Image */}
        <Image 
          src="/trustBrand01.png" 
          style={styles.watermark}
        />

        {/* Corner Design with Rotation */}
        <Image
          src="/border2.png"
          style={[styles.cornerImage, { top: 10, left: 10, transform: [{ rotate: '45deg' }] }]}
        />
        <Image
          src="/border3.png"
          style={[styles.cornerImage, { top: 10, right: 10, transform: [{ rotate: '-180deg' }] }]}
        />

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>CERTIFICATE</Text>
          <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>OF ACHIEVEMENT</Text>
          <View style={styles.divider} />
        </View>

        {/* Recipient Details */}
        <Text style={styles.recipient}>This certificate is proudly presented to</Text>
        <Text style={[styles.name, { fontWeight: 'bold' }]}>{admin.fullName}</Text>
        <Text style={styles.description}>
          For outstanding performance and dedication. This award is presented in recognition
          of their exceptional contributions.
        </Text>
        <Text style={[styles.centeredText, { color: '#ea580c', fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }]}>
          Samadhan Group
        </Text>

        {/* Award Image */}
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Image src="/awardImg.png" style={{ width: 70, height: 70 }} />
        </View>

        {/* Signature Section */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureItem}>
            <Text style={{ fontSize: 10, color: '#d1d5db' }}>Date of Issue</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.centeredText}>{new Date().toLocaleDateString()}</Text>
          </View>

          <View style={styles.signatureItems}>
            <Text style={{ fontSize: 10, color: '#d1d5db' }}>Authorized Signature</Text>
            <View style={styles.signatureLine} />
            {/* <Text style={styles.centeredText}></Text> */}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
