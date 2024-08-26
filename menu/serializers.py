from rest_framework import serializers
from .models import Menu, MenuItem

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class MenuItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'parent', 'menu', 'children']

    def get_children(self, obj):
        children = MenuItem.objects.filter(parent=obj)
        return MenuItemSerializer(children, many=True).data
