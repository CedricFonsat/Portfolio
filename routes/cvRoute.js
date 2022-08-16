import { Router } from "express";
import multer from "multer";
import projectModel from "../models/projectModel.js";
import 'dotenv/config'

const cvRouter = Router();
const users = JSON.parse(process.env['USER_ADMIN']);

//protection de page admin

const authGuard = async function (req,res,next) {
  if (users._id == req.session.users) {
      next()
  }else{
      res.redirect("/");
  }
}

//image

const storage = multer.diskStorage({
    // destination pour le fichier
    destination:function(req,file,callback){
      callback(null,'./assets/uploads/images' )
    },
    //ajouter le retour de l'extension
    filename:function (req,file,callback) {
      callback(null,Date.now() + file.originalname)
    },
  })
  
  //upload parametre pour multer
  const upload = multer({
    storage:storage,
    limits:{
      fieldSize:1024*1024*3,
    },
  })

cvRouter.get("/", async (req, res) => {
  let project = await projectModel.find(req.body);
      res.render("cv_home.twig",{
        project: project,
    });
});

cvRouter.get("/portfolio", async (req, res) => {
  let project = await projectModel.find(req.body);
      res.render("./dependency/cv_portfolio.twig",{
        project: project,
    });
});

//admin login

cvRouter.get("/admin_login", async (req, res) => {
    res.render("./admin/cv_admin_login.twig");
});

cvRouter.post("/admin_login", async (req, res) => {
  if (users.name == req.body.name) {
    if (users.password == req.body.password) {
      req.session.users = users._id
      res.redirect('/admin');
    }
}else{
    req.session.error = "vous n'etes pas connecté"
    res.redirect('/admin_login')
}
});

// logout admin

cvRouter.get('/logout',function(req, res) {
  req.session.destroy()
 res.redirect('/');
});

//admin

cvRouter.get("/admin",authGuard, async (req, res) => {
  let userSession;
  if (req.session.users == users._id) {
      userSession = users.name;
  }
    let project = await projectModel.find(req.body);
    res.render("./admin/cv_admin.twig",{
        project: project,
        userSession: userSession,
    });
});

//admin ajout de projet

cvRouter.get("/admin_add_project",authGuard, async (req, res) => {
    res.render("./admin/cv_admin_add_project.twig");
});

cvRouter.post("/admin_add_project",upload.single('image'), async (req, res) => {
try {
    req.body.img = req.file.filename;
    const newProject = new projectModel(req.body);
    await newProject.save();
    res.redirect("/admin");
} catch (error) {
  res.redirect("/");
}
});

//admin supprimer projet

cvRouter.get("/admin_delete_project/:id",authGuard, async (req, res) => {
    try {
      await projectModel.deleteOne({ _id: req.params.id });
      res.redirect("/admin");
    } catch (error) {
      res.redirect("/");
    }
  });

//admin modifier projet

cvRouter.get("/admin_update_project/:id",authGuard, async (req, res) => {
    try {
     let project =  await projectModel.findOne({ _id: req.params.id }, req.body);
      res.render("./admin/cv_admin_update.twig",{
        project: project
      });
    } catch (error) {
      res.send(error);
    }
  });
  
cvRouter.post("/admin_update_project/:id", async (req, res) => {
    try {
      await projectModel.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  });  

 
export default cvRouter;