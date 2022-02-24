const addContact = async (req, res) => {
  try {
    const newContact = req.body;
    // test name and email required
    if (!newContact.name || !newContact.email) {
      return res.status(400).send({ msg: "name and email are required !!!" });
    }
    // test email is unique
    const contactToFind = await Contact.findOne({ email: newContact.email });
    if (contactToFind) {
      return res.status(400).send({ msg: " Contact already exist !!! " });
    }
    // create new document
    const contactToAdd = new Contact(newContact);
    await contactToAdd.save();
    res.status(200).send({ msg: "Contact added succ .....", contactToAdd });
  } catch (error) {
    res.status(400).send({ msg: " Can not add new Contact !!! ", error });
  }
};
// get all contacts
const getContacts = async (req, res) => {
  try {
    const listContacts = await Contact.find();
    res
      .status(200)
      .send({ msg: "This is the list of contacts.....", listContacts });
  } catch (error) {
    res.status(400).send({ msg: " Can not get all  contacts !!! ", error });
  }
};
// delete contact
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    await Contact.deleteOne({ _id: contactId });
    res.status(200).send({ msg: "Contact deleted succ ....." });
  } catch (error) {
    res
      .status(400)
      .send({ msg: " Can not delete  contact with this id !!! ", error });
  }
};
// get one contact
const getContact = async (req, res) => {
  try {
    const { _id } = req.params;
    const contactToFind = await Contact.findOne({ _id });
    res.status(200).send({ msg: "I find  the contact.....", contactToFind });
  } catch (error) {
    res
      .status(400)
      .send({ msg: " Can not get contact with this id !!! ", error });
  }
};
// update contact
const updateContact = async (req, res) => {
  try {
    const { _id } = req.params;
    const newContact = req.body;
    let result = await Contact.updateOne({ _id }, { $set: { ...newContact } });
    if (result.nModified === 0) {
      return res.status(400).send({ msg: " Contact already updated  !!! " });
    }
    res.status(200).send({ msg: "Contact updated succ .....", contactToFind });
  } catch (error) {
    res
      .status(400)
      .send({ msg: " Can not update contact with this id !!! ", error });
  }
};

module.exports = controllers = {
  addContact,
  getContacts,
  deleteContact,
  getContact,
  updateContact,
};
