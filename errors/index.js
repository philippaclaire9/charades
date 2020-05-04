exports.handles404s = (req, res, next) => {
  res.status(404).send({ msg: 'Sorry, path not found!' });
};

exports.handles405s = (req, res, next) => {
  res.status(405).send({ msg: 'Sorry, method not allowed!' });
};

exports.handlesStatusErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handles400s = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Sorry, bad request!' });
  } else next(err);
};
