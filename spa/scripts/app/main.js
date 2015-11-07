// set up some models and views

x7.collections = {

};

x7.models = {
    //about:      new x7.AboutModel(),
    app:        new x7.AppModel(),
    //contact:    new x7.ContactModel(),
    home:       new x7.HomeModel(),
    //music:      new x7.MusicModel(),
    //player:     new x7.PlayerModel(),
    nav: new x7.NavModel(),
    player: new x7.PlayerModel(),
    //playlists:  new x7.PlaylistsModel(),
    //projects:   new x7.ProjectsModel()  
    search:     new x7.SearchModel()  
};


// Kick off the application when the DOM is loaded.
$(document).ready(function () {

    x7.templates = {
        //about:      $("#template_about").html(),
        app:        $("#template_app").html(),
        //contact:    $("#template_contact").html(),
        //home:       $("#template_home").html(),
        //music:      $("#template_music").html(),
        nav: $("#template_nav").html(),
        player: $("#template_player").html(),
        //playlists:  $("#template_playlists").html(),
        //projects:   $("#template_projects").html()
        search: $("#template_search").html()
    };

    x7.views = {
        //about:      new x7.AboutView({ model: x7.models.about, template: x7.templates.about }),
        app:        new x7.AppView({ model: x7.models.app, template: x7.templates.app }),
        //contact:    new x7.ContactView({ model: x7.models.contact, template: x7.templates.contact }),
        home:       new x7.HomeView({ model: x7.models.home, template: x7.templates.home }),
        //music:      new x7.MusicView({ model: x7.models.music, template: x7.templates.music }),
        nav: new x7.NavView({ model: x7.models.nav, template: x7.templates.nav }),
        player: new x7.PlayerView({ model: x7.models.player, template: x7.templates.player }),
        //playlists:  new x7.PlaylistsView({ model: x7.models.playlists, template: x7.templates.playlists }),
        //projects:   new x7.ProjectsView({ model: x7.models.projects, template: x7.templates.projects })
        search:     new x7.SearchView({ model: x7.models.search, template: x7.templates.search })
    };

    var app = new App();
    app.init(x7);
});