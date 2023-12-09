import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { Response } from 'express';
const axios = require('axios');
const FormData = require('form-data');

@Injectable()
export class ZohoService {
  async createDocument(
    file: any,
    @Res() res: Response,
    @Req() req: Request,
    recipents,
  ) {
    // Create a new FormData object
    const formData = new FormData();

    // Append the file from Postman form data
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    formData.append('file', file.buffer, {
      filename: file.originalname,
    });

    // Append the JSON data as a string
    formData.append(
      'data',
      JSON.stringify({
        requests: {
          request_name: 'NDA ',
          actions: [
            {
              recipient_name: recipents.role2_name,
              recipient_email: recipents.role2_email,
              recipient_phonenumber: '',
              recipient_countrycode: '',
              action_type: 'SIGN',
              private_notes: 'Please get back to us for further queries',
              signing_order: 0,
              verify_recipient: true,
              verification_type: 'EMAIL',
              verification_code: '',
            },
            {
              recipient_name: recipents.role3_name,
              recipient_email: recipents.role3_email,
              recipient_phonenumber: '',
              recipient_countrycode: '',
              action_type: 'SIGN',
              private_notes: 'Please get back to us for further queries',
              signing_order: 1,
              verify_recipient: true,
              verification_type: 'EMAIL',
              verification_code: '',
            },
          ],
          expiration_days: 1,
          is_sequential: true,
          email_reminders: true,
          reminder_period: 8,
        },
      }),
    );

    try {
      // Make the POST request with axios
      const response = await axios.post(
        'https://sign.zoho.in/api/v1/requests',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Zoho-oauthtoken 1000.f44c29c8d088627504bf4f6481bc753d.7bc64a7ce46151ee09aa85cacd9a1f81`,
          },
        },
      );
      // Handle the response
      //   console.log('Response:', response.data.requests.actions);

      return res.status(200).json({
        message: 'Document Created Ready to Sign',
        request_id: response.data.requests.request_id,
        document_name: response.data.requests.document_ids[0].document_name,
        document_id: response.data.requests.document_ids[0].document_id,
        action_id_role2: response.data.requests.actions[0].action_id,
        action_id_role3: response.data.requests.actions[1].action_id,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async signDocument(id, res) {
    try {
      let requestBody = {
        requests: {
          actions: [
            {
              verify_recipient: false,
              verification_type: 'EMAIL',
              action_type: 'SIGN',
              private_notes: '',
              signing_order: 0,
              recipient_name: 'piyush20001024',
              recipient_email: 'piyush20001024@gmail.com',
              in_person_name: 'Piyush',
              action_id: '53319000000028245',
              fields: [
                {
                  field_name: 'Signature',
                  field_type_id: '53319000000000177',
                  field_type_name: 'Signature',
                  field_category: 'image',
                  field_label: 'Signature',
                  is_mandatory: true,
                  page_no: 4,
                  document_id: '53319000000028229',
                  y_coord: 20,
                  action_id: '53319000000028245',
                  abs_width: 22,
                  description_tooltip: '',
                  x_coord: 42,
                  abs_height: 15,
                },
              ],
              recipient_phonenumber: '',
              recipient_countrycode: '',
              deleted_fields: [],
            },
            {
              verify_recipient: false,
              verification_type: 'EMAIL',
              action_type: 'SIGN',
              private_notes: '',
              signing_order: 1,
              recipient_name: 'office20001024',
              recipient_email: 'office20001024@gmail.com',
              in_person_name: 'Office',
              action_id: '53319000000028248',
              fields: [
                {
                  field_name: 'Signature',
                  field_type_name: 'Signature',
                  field_type_id: '53319000000000177',
                  field_category: 'image',
                  field_label: 'Signature',
                  is_mandatory: true,
                  page_no: 4,
                  document_id: '53319000000028229',
                  y_coord: 20,
                  action_id: '53319000000028248',
                  abs_width: 22,
                  description_tooltip: '',
                  x_coord: 48,
                  abs_height: 15,
                },
              ],
              recipient_phonenumber: '',
              recipient_countrycode: '',
              deleted_fields: [],
            },
          ],
          deleted_actions: [],
          request_name: 'Leave a note test',
        },
      };

      const response = await axios.post(
        `https://sign.zoho.in/api/v1/requests/${id}/submit`,
        requestBody,
        {
          headers: {
            Authorization: `Zoho-oauthtoken 1000.f44c29c8d088627504bf4f6481bc753d.7bc64a7ce46151ee09aa85cacd9a1f81`,
            'Content-Type': 'application/json',
          },
        },
      );
      return res.status(200).json({ message: 'Document Sent for Signature' });
    } catch (error) {
      console.error('Error Response:', error.response.data);

      return res.status(500).json({ message: error.message });
    }
  }
}
