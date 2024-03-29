from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

react_routes = getattr(settings, "REACT_ROUTES", [])

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name="index.html")),
    path("", include("cookbookapp.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

for route in react_routes:
    urlpatterns += [
        path("{}".format(route), TemplateView.as_view(template_name="index.html"))
    ]
